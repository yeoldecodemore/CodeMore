const _dateWithoutTime = require('../../dateWithoutTime')

const _gitCommitMapper = (items, repo, username, userId) =>
  items
    .filter(val => {
      if (val && val.committer && val.committer.login === username) {
        return val
      }
    })
    .map(curr => ({
      message: curr.commit.message,
      repo,
      date: _dateWithoutTime(curr.commit.author.date),
      userId
    }))

module.exports = _gitCommitMapper
