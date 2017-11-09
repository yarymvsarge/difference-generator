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

const complexObjectToString = (obj, spaces) => {
  const str = Object.keys(obj).map(key => `${' '.repeat(spaces)}  ${key}: ${obj[key]}`).join('\n');
  return `{\n${str}\n${' '.repeat(spaces - 2)}}`;
};

const isComplexObject = (type, value) =>
  (type !== 'nested' && type !== 'changed'
  && value instanceof Object && !(value instanceof Array));

const jsonOutput = (ast) => {
  const defaultSpaces = 2;
  const spacesIncrement = 4;
  const iter = (spacesCount, acc) => {
    const spaces = ' '.repeat(spacesCount);
    return acc.map((elem) => {
      const { name, type, value } = elem;
      const strValue = isComplexObject(type, value) ?
        complexObjectToString(value, spacesCount + spacesIncrement) : value;
      switch (type) {
        case 'not changed':
          return `${spaces}  ${name}: ${strValue}`;
        case 'deleted':
          return `${spaces}- ${name}: ${strValue}`;
        case 'inserted':
          return `${spaces}+ ${name}: ${strValue}`;
        case 'changed':
          return `${spaces}+ ${name}: ${strValue.new}\n${spaces}- ${name}: ${strValue.old}`;
        case 'nested':
          return `${spaces}  ${name}: {\n${iter(spacesCount + spacesIncrement, strValue)}\n${spaces}  }`;
        default:
          return '';
      }
    }).join('\n');
  };
  return `{\n${iter(defaultSpaces, ast)}\n}`;
};

const plainOutput = (ast) => {
  const iter = (property, acc) => acc.map((elem) => {
    const { name, type, value } = elem;
    const strValue = isComplexObject(type, value) ?
      'complex value' : value;
    const fullName = (property) ? `${property}.${name}` : name;
    switch (type) {
      case 'deleted':
        return `Property '${fullName}' was removed`;
      case 'inserted':
        return `Property '${fullName}' was added with ${(strValue === 'complex value') ? strValue : `value: ${strValue}`}`;
      case 'changed':
        return `Property '${fullName}' was updated. From '${strValue.old}' to '${strValue.new}'`;
      case 'nested':
        return iter(`${fullName}`, strValue);
      default:
        return '';
    }
  }).filter(str => str).join('\n');
  return iter('', ast);
};

const renderer = {
  plain: plainOutput,
  json: jsonOutput,
};

export default (pathToFile1, pathToFile2, output = 'json') => {
  const format = extname(pathToFile1).slice(1);
  const parse = parserFromFormat[format];
  if (!parse) {
    throw new Error('there is no parser for this extension');
  }
  const firstConfig = parse(readFileSync(pathToFile1, 'utf-8'));
  const secondConfig = parse(readFileSync(pathToFile2, 'utf-8'));
  const ast = getAst(firstConfig, secondConfig);
  const render = renderer[output];
  const result = render(ast);
  return result;
};
