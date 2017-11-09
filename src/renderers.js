const complexObjectToString = (obj, spaces) => {
  const str = Object.keys(obj).map(key => `${' '.repeat(spaces)}  ${key}: ${obj[key]}`).join('\n');
  return `{\n${str}\n${' '.repeat(spaces - 2)}}`;
};

const isComplexObject = (type, value) =>
  (type !== 'nested' && type !== 'changed'
  && value instanceof Object && !(value instanceof Array));

const nestedOutput = (ast) => {
  const defaultSpaces = 2;
  const spacesIncrement = 4;
  const iter = (spacesCount, acc) => {
    const spaces = ' '.repeat(spacesCount);
    return acc.map((elem) => {
      const { name, type, value } = elem;
      const strValue = isComplexObject(type, value) ?
        complexObjectToString(value, spacesCount + spacesIncrement) : value;
      switch (type) {
        case 'not changed':
          return `${spaces}  ${name}: ${strValue}`;
        case 'deleted':
          return `${spaces}- ${name}: ${strValue}`;
        case 'inserted':
          return `${spaces}+ ${name}: ${strValue}`;
        case 'changed':
          return `${spaces}+ ${name}: ${strValue.new}\n${spaces}- ${name}: ${strValue.old}`;
        case 'nested':
          return `${spaces}  ${name}: {\n${iter(spacesCount + spacesIncrement, strValue)}\n${spaces}  }`;
        default:
          return '';
      }
    }).join('\n');
  };
  return `{\n${iter(defaultSpaces, ast)}\n}`;
};

const plainOutput = (ast) => {
  const iter = (property, acc) => acc.map((elem) => {
    const { name, type, value } = elem;
    const strValue = isComplexObject(type, value) ?
      'complex value' : value;
    const fullName = (property) ? `${property}.${name}` : name;
    switch (type) {
      case 'deleted':
        return `Property '${fullName}' was removed`;
      case 'inserted':
        return `Property '${fullName}' was added with ${(strValue === 'complex value') ? strValue : `value: ${strValue}`}`;
      case 'changed':
        return `Property '${fullName}' was updated. From '${strValue.old}' to '${strValue.new}'`;
      case 'nested':
        return iter(`${fullName}`, strValue);
      default:
        return '';
    }
  }).filter(str => str).join('\n');
  return iter('', ast);
};

const jsonOutput = (ast) => {
  const iter = acc => acc.reduce((cur, elem) => {
    const { name, type, value } = elem;
    return (type === 'nested') ? { ...cur, [name]: { type, value: iter(value) } }
      : { ...cur, [name]: { type, value } };
  }, {});
  return JSON.stringify(iter(ast), null, 2);
};

const renderers = {
  plain: plainOutput,
  nested: nestedOutput,
  json: jsonOutput,
};

export default (type) => {
  if (!renderers[type]) {
    throw new Error('Cannot render difference in this format');
  }
  return renderers[type];
};
