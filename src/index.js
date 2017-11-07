import { readFileSync } from 'fs';
import { extname } from 'path';
import _ from 'lodash';
import { safeLoad } from 'js-yaml';
import ini from 'ini';

const parserFromFormat = {
  json: JSON.parse,
  yml: safeLoad,
  ini: ini.parse,
};

const getDiff = (firstConfig, secondConfig) => {
  const configsKeys = _.union(Object.keys(firstConfig), Object.keys(secondConfig));
  const difference = configsKeys.map((key) => {
    if (_.has(firstConfig, key) && _.has(secondConfig, key)) {
      return (firstConfig[key] === secondConfig[key])
        ? `  ${key}: ${firstConfig[key]}`
        : `+ ${key}: ${secondConfig[key]}\n- ${key}: ${firstConfig[key]}`;
    }
    return (_.has(firstConfig, key)) ? `- ${key}: ${firstConfig[key]}` : `+ ${key}: ${secondConfig[key]}`;
  }).join('\n');
  return `{\n${difference}\n}`;
};

export default (pathToFile1, pathToFile2) => {
  const format = extname(pathToFile1).slice(1);
  const parse = parserFromFormat[format];
  if (!parse) {
    throw new Error('there is no parser for this extension');
  }
  const firstConfig = parse(readFileSync(pathToFile1, 'utf-8'));
  const secondConfig = parse(readFileSync(pathToFile2, 'utf-8'));
  return getDiff(firstConfig, secondConfig);
};
