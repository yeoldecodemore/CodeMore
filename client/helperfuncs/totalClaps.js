export const totalClaps = arr =>
  arr.reduce((accum, curr) => accum + curr.claps, 0)
