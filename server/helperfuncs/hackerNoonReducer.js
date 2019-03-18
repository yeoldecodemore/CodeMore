const _hackerNoonReducer = (articles, userId) =>
  articles.map(curr => ({...curr, userId}))

module.exports = _hackerNoonReducer
