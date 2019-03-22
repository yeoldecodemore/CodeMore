const axios = require('axios')
const {Stackoverflow} = require('../../db/models')
const {_stackoverflowConverter} = require('./helperfuncs/')

const _callStackUserAPI = async (username, option) => {
  const data = await axios.get(
    `https://api.stackexchange.com/2.2/users/${username}?order=desc&sort=${
      option.reputation
    }&site=${option.site}&key=${option.key}&filter=!-*jbN*IioeJ6`
  )
  return data.data.items
}

const _updateStackUser = async (userId, data) => {
  const [numRows, stackUser] = await Stackoverflow.update(data, {
    where: {userId},
    returning: true
  })

  return stackUser[0]
}

const _createStackUser = async (userId, data) => {
  const stackUser = await Stackoverflow.create(
    {...data, userId},
    {returning: true}
  )

  return stackUser
}

const _getStackUser = async (username, userId, option) => {
  let result = await Stackoverflow.findOne({where: {userId}})
  const data = await _callStackUserAPI(username, option)
  const updatedData = _stackoverflowConverter(...data, userId)

  return result
    ? _updateStackUser(userId, updatedData)
    : _createStackUser(userId, updatedData)
}

module.exports = _getStackUser
