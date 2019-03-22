const _hackernoonReducer = (articles, userId) =>
  articles.map(curr => ({...curr, userId}))

module.exports = _hackernoonReducer
