export const _filterTruthyData = data =>
  Object.keys(data).reduce((accum, curr) => {
    console.log('_filterTruthyData')
    console.log(data, data[curr], curr)
    if (data[curr]) accum[curr] = data[curr]
    return accum
  }, {})
