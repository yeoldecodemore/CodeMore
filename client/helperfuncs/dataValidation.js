export const _dataValidation = data => {
  const validData = {...data}
  if (validData.stackoverflow)
    validData.stackoverflow = !isNaN(validData.stackoverflow)
  if (validData.hackernoon)
    validData.hackernoon = validData.hackernoon.includes('@')
  if (validData.email) validData.email = validData.email.includes('@')
  if (validData.medium) validData.medium = validData.medium.includes('@')
  return Object.keys(validData).length
    ? Object.keys(validData).reduce(
        (accum, curr) => accum && !!validData[curr],
        true
      )
    : false
}
