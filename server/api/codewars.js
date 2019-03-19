const router = require('express').Router()
const axios = require('axios')
const {Codewars, CodewarsLanguages, CodewarsQuestions} = require('../db/models')
const {
  _codeWarsLanguageReducer,
  _codeWarsQuestionsReducer
} = require('../helperfuncs')

//this is to get the initial data
router.get('/:id/:username', async (req, res, next) => {
  const userId = req.params.id
  //to get majority of the data
  try {
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

    //to get the questions
    const {data: {data}} = await axios.get(
      `https://www.codewars.com/api/v1/users/${
        req.params.username
      }/code-challenges/completed?page=0`
    )

    const generalCodewars = await Codewars.create({
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
    })

    const {id} = generalCodewars.get({plain: true})

    const codewarsLanguages = await CodewarsLanguages.bulkCreate(
      _codeWarsLanguageReducer(languages, id),
      {returning: true}
    )

    const codewarsQuestions = await CodewarsQuestions.bulkCreate(
      _codeWarsQuestionsReducer(data, id),
      {returning: true}
    )

    res.json({generalCodewars, codewarsLanguages, codewarsQuestions})
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
