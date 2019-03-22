const axios = require('axios')
const {StackoverflowDailyRepChange} = require('../../db/models')
const {_dailyReputationChange} = require('./helperfuncs/')
const _bulkUpdateorCreate = require('../bulkUpdateorCreate')

const _callStackDailyRepAPI = async (username, option) => {
  const data = await axios.get(
    `https://api.stackexchange.com/2.2/users/${username}/reputation-history?site=${
      option.site
    }&key=${option.key}`
  )
  return data.data.items
}

const _getStackDailyRep = async (username, id, option) => {
  const data = await _callStackDailyRepAPI(username, option)

  const stackDailyRep = await _bulkUpdateorCreate(
    _dailyReputationChange(data, id),
    ['stackoverflowmodelId', 'date'],
    StackoverflowDailyRepChange
  )
  return stackDailyRep
}

module.exports = _getStackDailyRep
