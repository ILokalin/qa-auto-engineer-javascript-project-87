// @ts-check
import renderStylish from './stylish.js';
import renderPlain from './plain.js';

const formatters = {
  stylish: renderStylish,
  plain: renderPlain,
  json: JSON.stringify,
};

export default (data, type) => {
  const format = formatters[type];
  if (!format) {
    throw new Error(`Unknown format type: ${type}`);
  }

  return format(data);
};
