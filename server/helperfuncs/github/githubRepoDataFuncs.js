const axios = require('axios')
const {_gitRepoMapper} = require('./helperfuncs/')
const {GithubRepos} = require('../../db/models/')
const _bulkUpdateorCreate = require('../bulkUpdateorCreate')

const _callGithubReposAPI = async (username, client) => {
  const data = await axios.get(
    `https://api.github.com/users/${username}/repos?client_id=${
      client.id
    }&client_secret=${client.secret}`
  )
  return data.data
}

const _getGithubRepos = async (username, id, client) => {
  const data = await _callGithubReposAPI(username, client)

  const gitArr = _gitRepoMapper(data, id)
  const gitrepos = await _bulkUpdateorCreate(
    gitArr,
    ['stackoverflowmodelId', 'creationDate'],
    GithubRepos
  )

  return [gitArr, gitrepos]
}

module.exports = _getGithubRepos
