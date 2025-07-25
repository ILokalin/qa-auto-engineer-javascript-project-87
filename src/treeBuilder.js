import _ from 'lodash'

const buildDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2))
  const sortedKeys = _.sortBy(keys)
  const diff = sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] }
    }

    if (!_.has(data2, key)) {
      return { key, type: 'deleted', value: data1[key] }
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key, type: 'changed', value1: data1[key], value2: data2[key],
      }
    }

    return { key, type: 'unchanged', value: data2[key] }
  })

  return diff
}

export default (data1, data2) => ({
  type: 'root',
  children: buildDiff(data1, data2),
})
