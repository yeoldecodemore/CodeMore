const {Medium} = require('../../db/models')
const mediumJSONFeed = require('medium-json-feed')
const {_mediumReducer} = require('./helperfuncs/')
const _bulkUpdateorCreate = require('../bulkUpdateorCreate')

const _getMediumPost = async (username, id) => {
  const {response} = await mediumJSONFeed(`@${username}`)

  const MediumPosts = await _bulkUpdateorCreate(
    _mediumReducer(response, id),
    ['userId', 'title'],
    Medium
  )
  return MediumPosts
}

module.exports = _getMediumPost
