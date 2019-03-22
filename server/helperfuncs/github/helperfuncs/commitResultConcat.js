const _commitResultConcat = results =>
  results.reduce((accum, curr) => [...accum, ...curr])

module.exports = _commitResultConcat
