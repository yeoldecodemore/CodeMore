const _dateWithoutTime = require('./dateWithoutTime')

const _gitCommitMapper = (items, repo, username, userId, index) => {
  //console.log(items[0])
  // console.log(Object.keys(items[0]))
  // console.log(Object.keys(items[0].author))
  // console.log(items[0].committer.login)
  // if (index === 7) {
  //   console.log(items[17])
  // }

  // items.forEach((val, i) => {
  //   val && val.committer && val.committer.login
  //     ? console.log('commit', val.committer.login)
  //     : console.log(`commit - ${index} - ${i} - ${val.commit.message}`)

  //   val && val.author && val.author.login
  //     ? console.log('auth', val.author.login)
  //     : console.log(`commit - ${index} - ${i} - ${val.commit.message}`)
  // })

  return items
    .filter((val, i) => {
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
}

module.exports = _gitCommitMapper
