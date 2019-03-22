const axios = require('axios')
const {StackoverflowTopTags} = require('../../db/models')
const {_topTagFilter} = require('./helperfuncs/')
const _bulkUpdateorCreate = require('../bulkUpdateorCreate')

const _callStackTopTagsAPI = async (username, option) => {
  const data = await axios.get(
    `https://api.stackexchange.com/2.2/users/${username}/top-tags?site=${
      option.site
    }&key=${option.key}`
  )
  return data.data.items
}

const _getStackTopTags = async (username, id, option) => {
  const data = await _callStackTopTagsAPI(username, option)

  const StackTopTags = await _bulkUpdateorCreate(
    _topTagFilter(data, id),
    ['stackoverflowmodelId', 'tagName'],
    StackoverflowTopTags
  )
  return StackTopTags
}

module.exports = _getStackTopTags
