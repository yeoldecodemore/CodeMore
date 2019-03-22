const axios = require('axios')
const {_gitCommitMapper, _commitResultConcat} = require('./helperfuncs/')
const {GithubCommits} = require('../../db/models/')
const _bulkUpdateorCreate = require('../bulkUpdateorCreate')

const _callGithubCommitsAPI = (gitArr, client) => {
  let promiseArr = gitArr.map(val =>
    axios.get(
      `https://api.github.com/repos/${val.name}/commits?client_id=${
        client.id
      }&client_secret=${client.secret}`
    )
  )
  let repo = gitArr.map(val => val.name.slice(val.name.indexOf('/') + 1))

  return [promiseArr, repo]
}

const _getGithubRepos = async (gitArr, repos, username, id, client) => {
  const [promiseArr, repo] = await _callGithubCommitsAPI(gitArr, client)

  let results = await Promise.all(promiseArr)

  let newPromiseArr = results.map((el, index) =>
    _bulkUpdateorCreate(
      _gitCommitMapper(el.data, repo[index], username, id),
      ['stackoverflowmodelId', 'creationDate'],
      GithubCommits
    )
  )

  let finalResults = await Promise.all(newPromiseArr)
  let commits = _commitResultConcat(finalResults)
  return [repos, commits]
}

module.exports = _getGithubRepos
