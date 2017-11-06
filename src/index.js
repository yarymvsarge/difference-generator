import { readFileSync } from 'fs';
import _ from 'lodash';
import { safeLoad } from 'js-yaml';

const State = {
  MODIFIED: 'modified',
  DELETED: '-',
  INSERTED: '+',
  NOT_CHANGED: ' ',
};

const ParseFormatFromFile = {
  json: filename => JSON.parse(readFileSync(filename)),
  yml: filename => safeLoad(readFileSync(filename)),
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
  const firstConfig = ParseFormatFromFile[format](pathToFile1);
  const secondConfig = ParseFormatFromFile[format](pathToFile2);
  return compare(firstConfig, secondConfig);
};
