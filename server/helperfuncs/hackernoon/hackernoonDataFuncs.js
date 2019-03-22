const {HackerNoon} = require('../../db/models')
const {_hackerNoonReducer, _getHackerNoonData} = require('./helperfuncs/')
const _bulkUpdateorCreate = require('../bulkUpdateorCreate')

const _getHackernoonPosts = async (username, id) => {
  const data = await _getHackerNoonData(username)

  const HackernoonPosts = await _bulkUpdateorCreate(
    _hackerNoonReducer(data, id),
    ['userId', 'title'],
    HackerNoon
  )

  return HackernoonPosts
}

module.exports = _getHackernoonPosts
