import genDiff from '../src';

const pathToJSONBefore = 'data/JSON/before.json';
const pathToJSONAfter = 'data/JSON/after.json';
const compareJSONResult = `{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
+ verbose: true
}`;

const pathToMyJSONBefore = 'data/JSON/beforeMy.json';
const pathToMyJSONAfter = 'data/JSON/afterMy.json';
const compareMyJSONResult = `{
+ host: hexlet.io
- host: localhost
  timeout: 20
- proxy: 223.234.53.243
+ work: true
- work: false
+ fruits: apple,orange,peach
- fruits: apple,orange
+ verbose: true
+ path: ~/user/test
+ files: 150
}`;

const pathToYAMLBefore = 'data/YAML/before.yml';
const pathToYAMLAfter = 'data/YAML/after.yml';
const compareYAMLResult = `{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
+ verbose: true
}`;

const pathToMyYAMLBefore = 'data/YAML/beforeMy.yml';
const pathToMyYAMLAfter = 'data/YAML/afterMy.yml';
const compareMyYAMLResult = `{
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
    expect(genDiff(pathToJSONBefore, pathToJSONAfter)).toEqual(compareJSONResult);
  });
  it('must pass my example', () => {
    expect(genDiff(pathToMyJSONBefore, pathToMyJSONAfter)).toEqual(compareMyJSONResult);
  });
});

describe('test YAML files comparing', () => {
  it('must pass hexlet example', () => {
    expect(genDiff(pathToYAMLBefore, pathToYAMLAfter)).toEqual(compareYAMLResult);
  });
  it('must pass my example', () => {
    expect(genDiff(pathToMyYAMLBefore, pathToMyYAMLAfter)).toEqual(compareMyYAMLResult);
  });
});
