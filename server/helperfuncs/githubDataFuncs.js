const axios = require('axios')
const {GithubRepos, GithubCommits} = require('../db/models')
const {_gitRepoMapper, _gitCommitMapper, _commitResultConcat} = require('.')

const clientid = process.env.GITHUB_CLIENT_ID
const clientsecret = process.env.GITHUB_CLIENT_SECRET

const _callGithubReposAPI = async (username, id) => {
  let data = await axios.get(
    `https://api.github.com/users/${username}/repos?client_id=${clientid}&client_secret=${clientsecret}`
  )

  const gitArr = _gitRepoMapper(data.data, id)
  const gitrepos = await GithubRepos.bulkCreate(gitArr, {
    returning: true
  })

  return [gitArr, gitrepos]
}

const _callGithubCommitsAPI = async (gitArr, repos, username, id) => {
  let promiseArr = gitArr.map(val =>
    axios.get(
      `https://api.github.com/repos/${
        val.name
      }/commits?client_id=${clientid}&client_secret=${clientsecret}`
    )
  )
  let repo = gitArr.map(val => val.name.slice(val.name.indexOf('/') + 1))

  let results = await Promise.all(promiseArr)
  let newPromiseArr = results.map((el, index) =>
    GithubCommits.bulkCreate(
      _gitCommitMapper(el.data, repo[index], username, id),
      {returning: true}
    )
  )
  let finalResults = await Promise.all(newPromiseArr)
  let commits = _commitResultConcat(finalResults)
  return [repos, commits]
}
module.exports = {
  _callGithubReposAPI,
  _callGithubCommitsAPI
}
