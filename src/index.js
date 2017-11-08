import { readFileSync } from 'fs';
import { extname } from 'path';
import { safeLoad } from 'js-yaml';
import ini from 'ini';
import makeAst from './modules/astParser';
import genDiff from './modules/differenceGenerator';

const parserFromFormat = {
  json: JSON.parse,
  yml: safeLoad,
  ini: ini.parse,
};

export default (pathToFile1, pathToFile2) => {
  const format = extname(pathToFile1).slice(1);
  const parse = parserFromFormat[format];
  if (!parse) {
    throw new Error('there is no parser for this extension');
  }
  const firstConfig = parse(readFileSync(pathToFile1, 'utf-8'));
  const secondConfig = parse(readFileSync(pathToFile2, 'utf-8'));
  const firstAst = makeAst(firstConfig);
  const secondAst = makeAst(secondConfig);
  return `{\n${genDiff(firstAst.children, secondAst.children)}\n}`;
};
