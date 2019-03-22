const axios = require('axios')
const {StackoverflowPrivileges} = require('../../db/models')
const {_privilegeMapper} = require('./helperfuncs/')
const _bulkUpdateorCreate = require('../bulkUpdateorCreate')

const _callStackPrivilegesAPI = async (username, option) => {
  const data = await axios.get(
    ` https://api.stackexchange.com/2.2/users/${username}/privileges?site=${
      option.site
    }&key=${option.key}`
  )
  return data.data.items
}

const _getStackPrivileges = async (username, id, option) => {
  const data = await _callStackPrivilegesAPI(username, option)

  const stackPrivileges = await _bulkUpdateorCreate(
    _privilegeMapper(data, id),
    ['stackoverflowmodelId', 'reputation'],
    StackoverflowPrivileges
  )
  return stackPrivileges
}

module.exports = _getStackPrivileges
