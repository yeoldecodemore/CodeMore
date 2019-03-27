export const sortByVal = (arr, val) =>
  arr.sort((a, b) => (a[val] > b[val] ? -1 : 1))
