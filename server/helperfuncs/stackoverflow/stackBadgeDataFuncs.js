const axios = require('axios')
const {StackoverflowBadges} = require('../../db/models')
const {_badgeMapper} = require('./helperfuncs/')
const _bulkUpdateorCreate = require('../bulkUpdateorCreate')

const _callStackBadgesAPI = async (username, option) => {
  const data = await axios.get(
    `https://api.stackexchange.com/2.2/users/${username}/badges?order=desc&sort=${
      option.rank
    }&site=${option.site}&key=${option.key}`
  )
  return data.data.items
}

const _getStackBadges = async (username, id, option) => {
  const data = await _callStackBadgesAPI(username, option)

  const StackBadges = await _bulkUpdateorCreate(
    _badgeMapper(data, id),
    ['stackoverflowmodelId', 'badge_name'],
    StackoverflowBadges
  )
  return StackBadges
}

module.exports = _getStackBadges
