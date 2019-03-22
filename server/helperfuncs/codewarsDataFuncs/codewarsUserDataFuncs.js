const axios = require('axios')
const {Codewars} = require('../../db/models')

const _organizeCodeWarsUserFromAPI = async user => {
  const {
    data: {
      username,
      honor,
      clan,
      leaderboardPosition,
      skills,
      ranks: {overall: {rank, name, color, score}, languages},
      codeChallenges: {totalAuthored, totalCompleted}
    }
  } = await axios.get(`https://www.codewars.com/api/v1/users/${user}`)

  return [
    languages,
    {
      username,
      honor,
      clan,
      leaderboardPosition,
      skills,
      overallRank: rank,
      overallRankName: name,
      overallRankColor: color,
      overallRankScore: score,
      totalAuthored,
      totalCompleted
    }
  ]
}

const _updateCodewarsUser = async (user, userId, languages, data) => {
  const [numRows, generalCodewars] = await Codewars.update(data, {
    where: {userId},
    returning: true
  })

  return [languages, ...generalCodewars]
}

const _createCodewarsUser = async (user, userId, languages, data) => {
  const generalCodewars = await Codewars.create({...data, userId})
  return [languages, generalCodewars]
}
const _getCodewarsUser = async (user, userId) => {
  let result = await Codewars.findOne({where: {userId}})
  const [languages, data] = await _organizeCodeWarsUserFromAPI(user)

  return result
    ? _updateCodewarsUser(user, userId, languages, data)
    : _createCodewarsUser(user, userId, languages, data)
}

module.exports = _getCodewarsUser
