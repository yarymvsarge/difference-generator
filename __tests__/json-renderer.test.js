import genDiff from '../src';

const compareJSONResult = `{
  "host": {
    "type": "not changed",
    "value": "hexlet.io"
  },
  "timeout": {
    "type": "changed",
    "value": {
      "old": 50,
      "new": 20
    }
  },
  "proxy": {
    "type": "deleted",
    "value": "123.234.53.22"
  },
  "verbose": {
    "type": "inserted",
    "value": true
  }
}`;

const compareMyJSONResult = `{
  "host": {
    "type": "changed",
    "value": {
      "old": "localhost",
      "new": "hexlet.io"
    }
  },
  "timeout": {
    "type": "not changed",
    "value": 20
  },
  "proxy": {
    "type": "deleted",
    "value": "223.234.53.243"
  },
  "work": {
    "type": "changed",
    "value": {
      "old": false,
      "new": true
    }
  },
  "fruits": {
    "type": "changed",
    "value": {
      "old": [
        "apple",
        "orange"
      ],
      "new": [
        "apple",
        "orange",
        "peach"
      ]
    }
  },
  "verbose": {
    "type": "inserted",
    "value": true
  },
  "path": {
    "type": "inserted",
    "value": "~/user/test"
  },
  "files": {
    "type": "inserted",
    "value": 150
  }
}`;

const compareYAMLResult = `{
  "host": {
    "type": "not changed",
    "value": "hexlet.io"
  },
  "timeout": {
    "type": "changed",
    "value": {
      "old": 50,
      "new": 20
    }
  },
  "proxy": {
    "type": "deleted",
    "value": "123.234.53.22"
  },
  "verbose": {
    "type": "inserted",
    "value": true
  }
}`;

const compareMyYAMLResult = `{
  "host": {
    "type": "changed",
    "value": {
      "old": "localhost",
      "new": "hexlet.io"
    }
  },
  "timeout": {
    "type": "not changed",
    "value": 20
  },
  "proxy": {
    "type": "deleted",
    "value": "223.234.53.243"
  },
  "work": {
    "type": "changed",
    "value": {
      "old": false,
      "new": true
    }
  },
  "verbose": {
    "type": "inserted",
    "value": true
  },
  "path": {
    "type": "inserted",
    "value": "~/user/test"
  },
  "files": {
    "type": "inserted",
    "value": 150
  }
}`;

const compareINIResult = `{
  "user": {
    "type": "changed",
    "value": {
      "old": "dbuser",
      "new": "uses"
    }
  },
  "password": {
    "type": "not changed",
    "value": "dbpassword"
  },
  "database": {
    "type": "not changed",
    "value": "use_this_database"
  },
  "datadir": {
    "type": "not changed",
    "value": "/var/lib/data"
  },
  "array": {
    "type": "changed",
    "value": {
      "old": [
        "first value",
        "second value",
        "third value"
      ],
      "new": [
        "first value"
      ]
    }
  }
}`;

const compareHexletResult = `{
  "common": {
    "type": "nested",
    "value": {
      "setting1": {
        "type": "not changed",
        "value": "Value 1"
      },
      "setting2": {
        "type": "deleted",
        "value": 200
      },
      "setting3": {
        "type": "not changed",
        "value": true
      },
      "setting6": {
        "type": "deleted",
        "value": {
          "key": "value"
        }
      },
      "setting4": {
        "type": "inserted",
        "value": "blah blah"
      },
      "setting5": {
        "type": "inserted",
        "value": {
          "key5": "value5"
        }
      }
    }
  },
  "group1": {
    "type": "nested",
    "value": {
      "baz": {
        "type": "changed",
        "value": {
          "old": "bas",
          "new": "bars"
        }
      },
      "foo": {
        "type": "not changed",
        "value": "bar"
      }
    }
  },
  "group2": {
    "type": "deleted",
    "value": {
      "abc": 12345
    }
  },
  "group3": {
    "type": "inserted",
    "value": {
      "fee": 100500
    }
  }
}`;

const compareINIHexletResult = `{
  "common": {
    "type": "nested",
    "value": {
      "setting1": {
        "type": "not changed",
        "value": "Value 1"
      },
      "setting2": {
        "type": "deleted",
        "value": "200"
      },
      "setting3": {
        "type": "not changed",
        "value": true
      },
      "setting6": {
        "type": "deleted",
        "value": {
          "key": "value"
        }
      },
      "setting4": {
        "type": "inserted",
        "value": "blah blah"
      },
      "setting5": {
        "type": "inserted",
        "value": {
          "key5": "value5"
        }
      }
    }
  },
  "group1": {
    "type": "nested",
    "value": {
      "baz": {
        "type": "changed",
        "value": {
          "old": "bas",
          "new": "bars"
        }
      },
      "foo": {
        "type": "not changed",
        "value": "bar"
      }
    }
  },
  "group2": {
    "type": "deleted",
    "value": {
      "abc": "12345"
    }
  },
  "group3": {
    "type": "inserted",
    "value": {
      "fee": "100500"
    }
  }
}`;

describe('json variant comparing', () => {
  describe('non-recursive JSON files comparing', () => {
    it('must pass hexlet JSON example', () => {
      const pathToJSONBefore = '__tests__/fixtures/JSON/before.json';
      const pathToJSONAfter = '__tests__/fixtures/JSON/after.json';
      expect(genDiff(pathToJSONBefore, pathToJSONAfter, 'json')).toEqual(compareJSONResult);
    });
    it('must pass my JSON example', () => {
      const pathToMyJSONBefore = '__tests__/fixtures/JSON/beforeMy.json';
      const pathToMyJSONAfter = '__tests__/fixtures/JSON/afterMy.json';
      expect(genDiff(pathToMyJSONBefore, pathToMyJSONAfter, 'json')).toEqual(compareMyJSONResult);
    });
    it('must pass YAML hexlet example', () => {
      const pathToYAMLBefore = '__tests__/fixtures/YAML/before.yml';
      const pathToYAMLAfter = '__tests__/fixtures/YAML/after.yml';
      expect(genDiff(pathToYAMLBefore, pathToYAMLAfter, 'json')).toEqual(compareYAMLResult);
    });
    it('must pass my example', () => {
      const pathToMyYAMLBefore = '__tests__/fixtures/YAML/beforeMy.yml';
      const pathToMyYAMLAfter = '__tests__/fixtures/YAML/afterMy.yml';
      expect(genDiff(pathToMyYAMLBefore, pathToMyYAMLAfter, 'json')).toEqual(compareMyYAMLResult);
    });
    it('must pass my INI example', () => {
      const pathToINIBefore = '__tests__/fixtures/INI/before.ini';
      const pathToINIAfter = '__tests__/fixtures/INI/after.ini';
      expect(genDiff(pathToINIBefore, pathToINIAfter, 'json')).toEqual(compareINIResult);
    });
  });
});

describe('recursive comparing', () => {
  describe('recursive files comparing', () => {
    it('must pass hexlet JSON example', () => {
      const pathToJSONBefore = '__tests__/fixtures/JSON/recursiveBefore.json';
      const pathToJSONAfter = '__tests__/fixtures/JSON/recursiveAfter.json';
      expect(genDiff(pathToJSONBefore, pathToJSONAfter, 'json')).toEqual(compareHexletResult);
    });
    it('must pass YAML hexlet example', () => {
      const pathToYAMLBefore = '__tests__/fixtures/YAML/recursiveBefore.yml';
      const pathToYAMLAfter = '__tests__/fixtures/YAML/recursiveAfter.yml';
      expect(genDiff(pathToYAMLBefore, pathToYAMLAfter, 'json')).toEqual(compareHexletResult);
    });
    it('must pass INI hexlet example', () => {
      const pathToINIBefore = '__tests__/fixtures/INI/recursiveBefore.ini';
      const pathToINIAfter = '__tests__/fixtures/INI/recursiveAfter.ini';
      expect(genDiff(pathToINIBefore, pathToINIAfter, 'json')).toEqual(compareINIHexletResult);
    });
  });
});
