import { readFileSync } from 'fs';
import { extname } from 'path';
import { safeLoad } from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';
import getRender from './renderers';

const parserFromFormat = {
  json: JSON.parse,
  yml: safeLoad,
  ini: ini.parse,
};

const keyTypes = [
  {
    type: 'nested',
    check: (first, second, key) => (first[key] instanceof Object && second[key] instanceof Object)
      && !(first[key] instanceof Array && second[key] instanceof Array),
    process: (first, second, fun) => fun(first, second),
  },
  {
    type: 'not changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] === second[key])),
    process: first => _.identity(first),
  },
  {
    type: 'changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] !== second[key])),
    process: (first, second) => ({ old: first, new: second }),
  },
  {
    type: 'deleted',
    check: (first, second, key) => (_.has(first, key) && !_.has(second, key)),
    process: first => _.identity(first),
  },
  {
    type: 'inserted',
    check: (first, second, key) => (!_.has(first, key) && _.has(second, key)),
    process: (first, second) => _.identity(second),
  },
];

const getAst = (firstConfig = {}, secondConfig = {}) => {
  const configsKeys = _.union(Object.keys(firstConfig), Object.keys(secondConfig));
  return configsKeys.map((key) => {
    const { type, process } = _.find(keyTypes, item => item.check(firstConfig, secondConfig, key));
    const value = process(firstConfig[key], secondConfig[key], getAst);
    return { name: key, type, value };
  });
};

export default (pathToFile1, pathToFile2, output = 'nested') => {
  const format = extname(pathToFile1).slice(1);
  const parse = parserFromFormat[format];
  if (!parse) {
    throw new Error('there is no parser for this extension');
  }
  const firstConfig = parse(readFileSync(pathToFile1, 'utf-8'));
  const secondConfig = parse(readFileSync(pathToFile2, 'utf-8'));
  const ast = getAst(firstConfig, secondConfig);
  const render = getRender(output);
  return render(ast);
};
