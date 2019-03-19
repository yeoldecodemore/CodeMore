export const _sentenceCase = data =>
  data.map(val => `${val.slice(0, 1).toUpperCase()}${val.slice(1)}`)
