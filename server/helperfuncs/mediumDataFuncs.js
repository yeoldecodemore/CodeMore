const {Medium} = require('../db/models')
const mediumJSONFeed = require('medium-json-feed')
const {_mediumReducer} = require('../helperfuncs')

const _callMediumPostAPI = async (username, id) => {
  const {response} = await mediumJSONFeed(`@${username}`)
  const MediumPosts = Medium.bulkCreate(_mediumReducer(response, id), {
    returning: true
  })
  return MediumPosts
}

module.exports = {_callMediumPostAPI}
