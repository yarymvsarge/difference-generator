import { readFileSync } from 'fs';
import _ from 'lodash';
import { safeLoad } from 'js-yaml';
import { parse } from 'ini';

const State = {
  MODIFIED: 'modified',
  DELETED: '-',
  INSERTED: '+',
  NOT_CHANGED: ' ',
};

const ParserFromFormat = {
  json: JSON.parse,
  yml: safeLoad,
  ini: parse,
};

const addStatesToConfig = (firstConfig, secondConfig, mergedConfig) =>
  Object.keys(mergedConfig).reduce((result, key) => {
    if (_.has(firstConfig, key) && _.has(secondConfig, key)) {
      if (firstConfig[key] === secondConfig[key]) {
        return { ...result, ...{ [key]: { state: State.NOT_CHANGED, value: firstConfig[key] } } };
      }
      return { ...result, ...{ [key]: { state: State.MODIFIED, value: firstConfig[key] } } };
    } else if (_.has(firstConfig, key) && !_.has(secondConfig, key)) {
      return { ...result, ...{ [key]: { state: State.DELETED, value: firstConfig[key] } } };
    }
    return { ...result, ...{ [key]: { state: State.INSERTED, value: secondConfig[key] } } };
  }, {});

const compare = (firstConfig, secondConfig) => {
  const mergedConfig = { ...firstConfig, ...secondConfig };
  const mergedConfigWithStates = addStatesToConfig(firstConfig, secondConfig, mergedConfig);
  const compareResult = Object.keys(mergedConfigWithStates).reduce((str, key) => {
    switch (mergedConfigWithStates[key].state) {
      case State.MODIFIED:
        return `${str}+ ${key}: ${secondConfig[key]}\n- ${key}: ${firstConfig[key]}\n`;
      default:
        return `${str}${mergedConfigWithStates[key].state} ${key}: ${mergedConfigWithStates[key].value}\n`;
    }
  }, '');
  return `{\n${compareResult}}`;
};

export default (pathToFile1, pathToFile2) => {
  const format = _.last(pathToFile1.split('.'));
  const parser = ParserFromFormat[format];
  const firstConfig = parser(readFileSync(pathToFile1, 'utf-8'));
  const secondConfig = parser(readFileSync(pathToFile2, 'utf-8'));
  return compare(firstConfig, secondConfig);
};
