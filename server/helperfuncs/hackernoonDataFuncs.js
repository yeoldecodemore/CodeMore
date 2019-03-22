const {HackerNoon} = require('../db/models')
const {_getHackerNoonData} = require('../scrape')
const {_hackerNoonReducer} = require('../helperfuncs')

const _callHackernoonPostsApi = async (username, id) => {
  const data = await _getHackerNoonData(username)

  const HackernoonInstance = await HackerNoon.bulkCreate(
    _hackerNoonReducer(data, id),
    {
      returning: true
    }
  )
  return HackernoonInstance
}

module.exports = {_callHackernoonPostsApi}
