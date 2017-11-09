import genDiff from '../src';

const compareJSONResult = `Property 'timeout' was updated. From '50' to '20'
Property 'proxy' was removed
Property 'verbose' was added with value: true`;

const compareMyJSONResult = `Property 'host' was updated. From 'localhost' to 'hexlet.io'
Property 'proxy' was removed
Property 'work' was updated. From 'false' to 'true'
Property 'fruits' was updated. From 'apple,orange' to 'apple,orange,peach'
Property 'verbose' was added with value: true
Property 'path' was added with value: ~/user/test
Property 'files' was added with value: 150`;

const compareYAMLResult = `Property 'timeout' was updated. From '50' to '20'
Property 'proxy' was removed
Property 'verbose' was added with value: true`;

const compareMyYAMLResult = `Property 'host' was updated. From 'localhost' to 'hexlet.io'
Property 'proxy' was removed
Property 'work' was updated. From 'false' to 'true'
Property 'verbose' was added with value: true
Property 'path' was added with value: ~/user/test
Property 'files' was added with value: 150`;

const compareINIResult = `Property 'user' was updated. From 'dbuser' to 'uses'
Property 'array' was updated. From 'first value,second value,third value' to 'first value'`;

const compareHexletResult = `Property 'common.setting2' was removed
Property 'common.setting6' was removed
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with complex value
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed
Property 'group3' was added with complex value`;

const compareMyResult = `Property 'common.setting2' was removed
Property 'common.setting6.key' was updated. From 'value' to 'valu1e'
Property 'common.setting6.key2.name' was updated. From 'Oleg' to 'Oledg'
Property 'common.setting6.key2.value.occupation' was removed
Property 'common.setting6.key2.value.interests' was removed
Property 'common.setting6.key2.value.email' was added with value: none
Property 'common.setting6.key2.value.fruits' was added with value: apple,peach,orange
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with complex value
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed
Property 'group3' was added with complex value`;

describe('json variant comparing', () => {
  describe('non-recursive JSON files comparing', () => {
    it('must pass hexlet JSON example', () => {
      const pathToJSONBefore = '__tests__/fixtures/JSON/before.json';
      const pathToJSONAfter = '__tests__/fixtures/JSON/after.json';
      expect(genDiff(pathToJSONBefore, pathToJSONAfter, 'plain')).toEqual(compareJSONResult);
    });
    it('must pass my JSON example', () => {
      const pathToMyJSONBefore = '__tests__/fixtures/JSON/beforeMy.json';
      const pathToMyJSONAfter = '__tests__/fixtures/JSON/afterMy.json';
      expect(genDiff(pathToMyJSONBefore, pathToMyJSONAfter, 'plain')).toEqual(compareMyJSONResult);
    });
    it('must pass YAML hexlet example', () => {
      const pathToYAMLBefore = '__tests__/fixtures/YAML/before.yml';
      const pathToYAMLAfter = '__tests__/fixtures/YAML/after.yml';
      expect(genDiff(pathToYAMLBefore, pathToYAMLAfter, 'plain')).toEqual(compareYAMLResult);
    });
    it('must pass my example', () => {
      const pathToMyYAMLBefore = '__tests__/fixtures/YAML/beforeMy.yml';
      const pathToMyYAMLAfter = '__tests__/fixtures/YAML/afterMy.yml';
      expect(genDiff(pathToMyYAMLBefore, pathToMyYAMLAfter, 'plain')).toEqual(compareMyYAMLResult);
    });
    it('must pass my INI example', () => {
      const pathToINIBefore = '__tests__/fixtures/INI/before.ini';
      const pathToINIAfter = '__tests__/fixtures/INI/after.ini';
      expect(genDiff(pathToINIBefore, pathToINIAfter, 'plain')).toEqual(compareINIResult);
    });
  });
});

describe('recursive comparing', () => {
  describe('recursive JSON files comparing', () => {
    it('must pass hexlet JSON example', () => {
      const pathToJSONBefore = '__tests__/fixtures/JSON/recursiveBefore.json';
      const pathToJSONAfter = '__tests__/fixtures/JSON/recursiveAfter.json';
      expect(genDiff(pathToJSONBefore, pathToJSONAfter, 'plain')).toEqual(compareHexletResult);
    });
    it('must pass my JSON example', () => {
      const pathToMyJSONBefore = '__tests__/fixtures/JSON/recursiveBeforeMy.json';
      const pathToMyJSONAfter = '__tests__/fixtures/JSON/recursiveAfterMy.json';
      expect(genDiff(pathToMyJSONBefore, pathToMyJSONAfter, 'plain')).toEqual(compareMyResult);
    });
    it('must pass YAML hexlet example', () => {
      const pathToYAMLBefore = '__tests__/fixtures/YAML/recursiveBefore.yml';
      const pathToYAMLAfter = '__tests__/fixtures/YAML/recursiveAfter.yml';
      expect(genDiff(pathToYAMLBefore, pathToYAMLAfter, 'plain')).toEqual(compareHexletResult);
    });
    it('must pass my YAML example', () => {
      const pathToMyYAMLBefore = '__tests__/fixtures/YAML/recursiveBeforeMy.yml';
      const pathToMyYAMLAfter = '__tests__/fixtures/YAML/recursiveAfterMy.yml';
      expect(genDiff(pathToMyYAMLBefore, pathToMyYAMLAfter, 'plain')).toEqual(compareMyResult);
    });
    it('must pass hexlet example', () => {
      const pathToINIBefore = '__tests__/fixtures/INI/recursiveBefore.ini';
      const pathToINIAfter = '__tests__/fixtures/INI/recursiveAfter.ini';
      expect(genDiff(pathToINIBefore, pathToINIAfter, 'plain')).toEqual(compareHexletResult);
    });
  });
});
