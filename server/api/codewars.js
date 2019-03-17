const router = require('express').Router()
const axios = require('axios')
const {Codewars, CodewarsLanguages, CodewarsQuestions} = require('../db/models')
const {
  _codeWarsLanguageReducer,
  _codeWarsQuestionsReducer
} = require('../helperfuncs')

router.get('/:id/:username', async (req, res, next) => {
  try {
    const userId = req.params.id
    //removed name from general data
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
    } = await axios.get(
      `https://www.codewars.com/api/v1/users/${req.params.username}`
    )
    const {data: {data}} = await axios.get(
      `https://www.codewars.com/api/v1/users/${
        req.params.username
      }/code-challenges/completed?page=0`
    )

    Codewars.create({
      userId,
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
    }).then(codewarInstance => {
      const {id} = codewarInstance.get({
        plain: true
      })
      CodewarsLanguages.bulkCreate(_codeWarsLanguageReducer(languages, id))
      CodewarsQuestions.bulkCreate(_codeWarsQuestionsReducer(data, id))
      res.json(codewarInstance)
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
