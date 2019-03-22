const axios = require('axios')
const {StackoverflowBadgeNetwork} = require('../../db/models')
const {_badgeNetworkFilter} = require('./helperfuncs/')
const _bulkUpdateorCreate = require('../bulkUpdateorCreate')

const _callStackBadgeNetworkAPI = async (username, option) => {
  const data = await axios.get(
    `https://api.stackexchange.com/2.2/users/${username}/network-activity?key=${
      option.key
    }`
  )
  return data.data.items
}

const _getStackBadgeNetwork = async (username, id, option) => {
  const data = await _callStackBadgeNetworkAPI(username, option)

  const StackBadgeNetwork = await _bulkUpdateorCreate(
    _badgeNetworkFilter(data, id),
    ['stackoverflowmodelId', 'creationDate'],
    StackoverflowBadgeNetwork
  )
  return StackBadgeNetwork
}

module.exports = _getStackBadgeNetwork
