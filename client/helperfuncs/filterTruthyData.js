export const _filterTruthyData = data =>
  Object.keys(data).reduce((accum, curr) => {
    if (data[curr]) accum[curr] = data[curr]
    return accum
  }, {})
