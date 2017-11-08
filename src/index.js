import { readFileSync } from 'fs';
import { extname } from 'path';
import { safeLoad } from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const parserFromFormat = {
  json: JSON.parse,
  yml: safeLoad,
  ini: ini.parse,
};

const states = [
  {
    state: 'object',
    check: (first, second, key) => first[key] instanceof Object || second[key] instanceof Object,
    process: (first, second, fun) => fun(first, second),
  },
  {
    state: 'not changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] === second[key])),
    process: first => _.identity(first),
  },
  {
    state: 'changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] !== second[key])),
    process: (first, second) => ({ old: first, new: second }),
  },
  {
    state: 'deleted',
    check: (first, second, key) => (_.has(first, key) && !_.has(second, key)),
    process: first => _.identity(first),
  },
  {
    state: 'inserted',
    check: (first, second, key) => (!_.has(first, key) && _.has(second, key)),
    process: (first, second) => _.identity(second),
  },
];

const getAst = (firstConfig = {}, secondConfig = {}) => {
  const configsKeys = _.union(Object.keys(firstConfig), Object.keys(secondConfig));
  return configsKeys.map((key) => {
    const { state, process } = _.find(states, item => item.check(firstConfig, secondConfig, key));
    const value = process(firstConfig[key], secondConfig[key], getAst);
    return { name: key, state, value };
  });
};

/* const getDiff = (ast) => {
  return ast.map((node) => {
    switch (node.state) {
      case 'not changed':
        return `  ${node.name}: ${node.value}`;
      case 'deleted':
        return `- ${node.name}: ${node.value}`;
      case 'inserted':
        return `+ ${node.name}: ${node.value}`;
      case 'changed':
        return `+ ${node.name}: ${node.value.new}\n- ${node.name}: ${node.value.new}`;
      case 'object':
        return `${node.name}: ${getDiff(node.value)}`;
      default:
        break;
    }
  }).join('\n');
}; */

export default (pathToFile1, pathToFile2) => {
  const format = extname(pathToFile1).slice(1);
  const parse = parserFromFormat[format];
  if (!parse) {
    throw new Error('there is no parser for this extension');
  }
  const firstConfig = parse(readFileSync(pathToFile1, 'utf-8'));
  const secondConfig = parse(readFileSync(pathToFile2, 'utf-8'));
  const ast = getAst(firstConfig, secondConfig);
  const text = getDiff(ast);
  return text;
};
