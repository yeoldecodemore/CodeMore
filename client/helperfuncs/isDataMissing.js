export const _isDataMissing = data =>
  data.reduce((accum, curr) => accum && !!curr, true)
