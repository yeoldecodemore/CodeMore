const router = require('express').Router()
const {
  _getCodewarsUser,
  _getCodewarsLanguages,
  _getCodewarsQuestions
} = require('../helperfuncs/codewarsDataFuncs/')

router.get('/:id/:username', async (req, res, next) => {
  try {
    const [languages, generalCodewars] = await _getCodewarsUser(
      req.params.username,
      req.params.id
    )

    const {id} = generalCodewars.get({plain: true})
    console.log(id)
    const codewarsLanguages = await _getCodewarsLanguages(languages, id)

    const codewarsQuestions = await _getCodewarsQuestions(
      req.params.username,
      id
    )
    res.json({generalCodewars, codewarsLanguages, codewarsQuestions})
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
