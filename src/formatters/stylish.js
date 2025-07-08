const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2)

const mapping = {
  root: ({ children }, depth, iter) => {
    const output = children.flatMap(node => mapping[node.type](node, depth + 1, iter))
    return `{\n${output.join('\n')}\n}`
  },
  added: (node, depth) => `${indent(depth)}+ ${node.key}: ${node.value}`,
  deleted: (node, depth) => `${indent(depth)}- ${node.key}: ${node.value}`,
  unchanged: (node, depth) => `${indent(depth)}  ${node.key}: ${node.value}`,
  changed: (node, depth) => {
    const { key, value1, value2 } = node

    const data1 = `${indent(depth)}- ${key}: ${value1}`
    const data2 = `${indent(depth)}+ ${key}: ${value2}`

    return [data1, data2]
  },
}

const renderTree = (ast) => {
  const iter = (node, depth) => mapping[node.type](node, depth, iter)
  return iter(ast, 0)
}

export default renderTree
