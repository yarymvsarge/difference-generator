import genDiff from '../src';

const compareJSONResult = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

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

const compareYAMLResult = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

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

const compareINIResult = `{
  + user: uses
  - user: dbuser
    password: dbpassword
    database: use_this_database
    datadir: /var/lib/data
  + array: first value
  - array: first value,second value,third value
}`;

const compareHexletResult = `{
    common: {
        setting1: Value 1
      - setting2: 200
        setting3: true
      - setting6: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;
const compareMyResult = `{
    common: {
        setting1: Value 1
      - setting2: 200
        setting3: true
        setting6: {
          + key: valu1e
          - key: value
            key2: {
              + name: Oledg
              - name: Oleg
                value: {
                  - occupation: Mega-programmer
                  - interests: js,programming
                  + email: none
                  + fruits: apple,peach,orange
                }
            }
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;

describe('json variant comparing', () => {
  describe('non-recursive JSON files comparing', () => {
    it('must pass hexlet JSON example', () => {
      const pathToJSONBefore = '__tests__/fixtures/JSON/before.json';
      const pathToJSONAfter = '__tests__/fixtures/JSON/after.json';
      expect(genDiff(pathToJSONBefore, pathToJSONAfter)).toEqual(compareJSONResult);
    });
    it('must pass my JSON example', () => {
      const pathToMyJSONBefore = '__tests__/fixtures/JSON/beforeMy.json';
      const pathToMyJSONAfter = '__tests__/fixtures/JSON/afterMy.json';
      expect(genDiff(pathToMyJSONBefore, pathToMyJSONAfter)).toEqual(compareMyJSONResult);
    });
    it('must pass YAML hexlet example', () => {
      const pathToYAMLBefore = '__tests__/fixtures/YAML/before.yml';
      const pathToYAMLAfter = '__tests__/fixtures/YAML/after.yml';
      expect(genDiff(pathToYAMLBefore, pathToYAMLAfter)).toEqual(compareYAMLResult);
    });
    it('must pass my example', () => {
      const pathToMyYAMLBefore = '__tests__/fixtures/YAML/beforeMy.yml';
      const pathToMyYAMLAfter = '__tests__/fixtures/YAML/afterMy.yml';
      expect(genDiff(pathToMyYAMLBefore, pathToMyYAMLAfter)).toEqual(compareMyYAMLResult);
    });
    it('must pass my INI example', () => {
      const pathToINIBefore = '__tests__/fixtures/INI/before.ini';
      const pathToINIAfter = '__tests__/fixtures/INI/after.ini';
      expect(genDiff(pathToINIBefore, pathToINIAfter)).toEqual(compareINIResult);
    });
  });
});

describe('recursive comparing', () => {
  describe('recursive JSON files comparing', () => {
    it('must pass hexlet JSON example', () => {
      const pathToJSONBefore = '__tests__/fixtures/JSON/recursiveBefore.json';
      const pathToJSONAfter = '__tests__/fixtures/JSON/recursiveAfter.json';
      expect(genDiff(pathToJSONBefore, pathToJSONAfter)).toEqual(compareHexletResult);
    });
    it('must pass my JSON example', () => {
      const pathToMyJSONBefore = '__tests__/fixtures/JSON/recursiveBeforeMy.json';
      const pathToMyJSONAfter = '__tests__/fixtures/JSON/recursiveAfterMy.json';
      expect(genDiff(pathToMyJSONBefore, pathToMyJSONAfter)).toEqual(compareMyResult);
    });
    it('must pass YAML hexlet example', () => {
      const pathToYAMLBefore = '__tests__/fixtures/YAML/recursiveBefore.yml';
      const pathToYAMLAfter = '__tests__/fixtures/YAML/recursiveAfter.yml';
      expect(genDiff(pathToYAMLBefore, pathToYAMLAfter)).toEqual(compareHexletResult);
    });
    it('must pass my YAML example', () => {
      const pathToMyYAMLBefore = '__tests__/fixtures/YAML/recursiveBeforeMy.yml';
      const pathToMyYAMLAfter = '__tests__/fixtures/YAML/recursiveAfterMy.yml';
      expect(genDiff(pathToMyYAMLBefore, pathToMyYAMLAfter)).toEqual(compareMyResult);
    });
    it('must pass hexlet example', () => {
      const pathToINIBefore = '__tests__/fixtures/INI/recursiveBefore.ini';
      const pathToINIAfter = '__tests__/fixtures/INI/recursiveAfter.ini';
      expect(genDiff(pathToINIBefore, pathToINIAfter)).toEqual(compareHexletResult);
    });
  });
});
