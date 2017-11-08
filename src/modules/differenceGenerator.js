import _ from 'lodash';

const state = {
  notChanged: '  ',
  deleted: '- ',
  inserted: '+ ',
};

const defaultSpaces = 2;

const generatorFromType = {
  object: spaceCount => str => `${' '.repeat(spaceCount)}${str}\n${' '.repeat(spaceCount + defaultSpaces)}}`,
  simple: spaceCount => (name, value, str = state.notChanged) => `${' '.repeat(spaceCount)}${str}${name}: ${value}`,
};

const getFullElement = children => children.map((obj) => {
  if (obj.type === 'object') {
    return generatorFromType.object(obj.spaces)(`${obj.name}: {\n${getFullElement(obj.children).join('\n')}`);
  }
  return generatorFromType.simple(obj.spaces)(obj.name, obj.value);
});

const genDiff = (firstAst = [], secondAst = []) => {
  const astKeys = _.unionBy(firstAst, secondAst, 'name')
    .map((child) => {
      const { name, value, spaces } = child;
      const firstTreeElement = _.find(firstAst, obj => obj.name === name);
      const secondTreeElement = _.find(secondAst, obj => obj.name === name);
      if (child.type === 'object') {
        const generateString = generatorFromType.object(spaces);
        if (firstTreeElement && secondTreeElement) {
          return generateString(`  ${name}: {\n${genDiff(firstTreeElement.children, secondTreeElement.children)}`);
        }
        return (firstTreeElement) ? generateString(`${state.deleted}${name}: {\n${getFullElement(firstTreeElement.children).join('\n')}`)
          : generateString(`${state.inserted}${name}: {\n${getFullElement(secondTreeElement.children).join('\n')}`);
      }
      const generateString = generatorFromType.simple(spaces);
      if (firstTreeElement && secondTreeElement) {
        return ((firstTreeElement.type === 'array' && secondTreeElement.type === 'array'
          && !_.difference(firstTreeElement.value, secondTreeElement.value).length
          && !_.difference(secondTreeElement.value, firstTreeElement.value).length)
        // only if elements are arrays, because if they are equal js will compare them by reference
        || firstTreeElement.value === secondTreeElement.value) ? generateString(name, value)
          : `${generateString(name, secondTreeElement.value, state.inserted)}\n${generateString(name, firstTreeElement.value, state.deleted)}`;
      }
      return (firstTreeElement) ? generateString(name, value, state.deleted)
        : generateString(name, value, state.inserted);
    });
  return `${astKeys.join('\n')}`;
};

export default genDiff;
