// @ts-check
import _ from 'lodash';

const propertyToString = (path) => `Property '${path.join('.')}'`;

const stringify = (data) => {
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  if (!_.isObject(data)) {
    return `${String(data)}`;
  }
  return '[complex value]';
};

const render = (node, path = []) => {
  const { key, type } = node;

  switch (type) {
    case 'root': {
      const { children } = node;
      // eslint-disable-next-line no-shadow
      const output = children.map((node) => render(node, path));
      return output.filter(Boolean).join('\n');
    }
    case 'nested': {
      const { children } = node;
      // eslint-disable-next-line no-shadow
      const output = children.flatMap((node) => render(node, [...path, key]));
      return output.filter(Boolean).join('\n');
    }
    case 'changed': {
      const data1 = stringify(node.value1);
      const data2 = stringify(node.value2);
      return `${propertyToString([...path, key])} was updated. From ${data1} to ${data2}`;
    }
    case 'removed':
      return `${propertyToString([...path, key])} was removed`;
    case 'added':
      return `${propertyToString([...path, key])} was added with value: ${stringify(node.value)}`;
    default:
      return '';
  }
};

export default (tree) => render(tree);
