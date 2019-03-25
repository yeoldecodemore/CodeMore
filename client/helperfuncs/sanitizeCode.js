const getLineWarnings = () =>
  [...document.getElementsByClassName('ace_info')].map(
    item => +item.innerHTML - 1
  )

const addSemiColons = code =>
  code.map(
    (line, index) =>
      getLineWarnings().includes(index) ? line.concat(';') : line
  )

const convertComments = code =>
  code.map(line => (line.includes('//') ? `/* ${line} */ ` : line))

export const _sanitizeCode = newValue => {
  newValue = newValue.split('\n')

  newValue = addSemiColons(newValue)
  newValue = convertComments(newValue)

  return newValue.join('\n')
}
