import genDiff from '../src';

const pathToJSONBefore = '__tests__/fixtures/JSON/before.json';
const pathToJSONAfter = '__tests__/fixtures/JSON/after.json';
const compareJSONResult = `{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
+ verbose: true
}`;

const pathToMyJSONBefore = '__tests__/fixtures/JSON/beforeMy.json';
const pathToMyJSONAfter = '__tests__/fixtures/JSON/afterMy.json';
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

const pathToYAMLBefore = '__tests__/fixtures/YAML/before.yml';
const pathToYAMLAfter = '__tests__/fixtures/YAML/after.yml';
const compareYAMLResult = `{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
+ verbose: true
}`;

const pathToMyYAMLBefore = '__tests__/fixtures/YAML/beforeMy.yml';
const pathToMyYAMLAfter = '__tests__/fixtures/YAML/afterMy.yml';
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

const pathToINIBefore = '__tests__/fixtures/INI/before.ini';
const pathToINIAfter = '__tests__/fixtures/INI/after.ini';
const compareINIResult = `{
+ user: uses
- user: dbuser
  password: dbpassword
  database: use_this_database
  datadir: /var/lib/data
+ array: first value
- array: first value,second value,third value
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

describe('test INI files comparing', () => {
  it('must pass my example', () => {
    expect(genDiff(pathToINIBefore, pathToINIAfter)).toEqual(compareINIResult);
  });
});
