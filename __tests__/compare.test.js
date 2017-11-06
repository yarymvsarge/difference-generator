import genDiff from '../src';

const pathToJSONBefore = 'data/before.json';
const pathToJSONAfter = 'data/after.json';
const compareResult = `{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
+ verbose: true
}`;

const pathToMyJSONBefore = 'data/beforeMy.json';
const pathToMyJSONAfter = 'data/afterMy.json';
const compareMyResult = `{
+ host: hexlet.io
- host: localhost
  timeout: 20
- proxy: 223.234.53.243
+ work: true
- work: false
+ verbose: true
+ path: ~/user/test
+ files: 150
}`;

describe('test JSON files comparing', () => {
  it('must pass hexlet example', () => {
    expect(genDiff(pathToJSONBefore, pathToJSONAfter)).toEqual(compareResult);
  });
  it('must pass my example', () => {
    expect(genDiff(pathToMyJSONBefore, pathToMyJSONAfter)).toEqual(compareMyResult);
  });
});
