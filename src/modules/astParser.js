export default (config) => {
  const spacesIncrement = 4;
  const defaultSpaces = 2;
  const iter = (current, spaces) => {
    const result = Object.keys(current).map((key) => {
      const type = (current[key] instanceof Array) ? 'array' : typeof current[key];
      const [value, children] = (type === 'object')
        ? ['', iter(current[key], spaces + spacesIncrement)] : [current[key], []];
      return {
        type, name: key, value, children, spaces,
      };
    });
    return result;
  };
  const children = iter(config, defaultSpaces);
  return { type: 'object', children };
};
