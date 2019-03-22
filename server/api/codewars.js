const router = require('express').Router()
const {Codewars, CodewarsLanguages, CodewarsQuestions} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  const userId = req.params.id
  try {
    const generalCodewars = await Codewars.findOne({
      where: {userId}
    })

    const id = generalCodewars.getDataValue('id')

    const codewarsLanguages = await CodewarsLanguages.findAll({
      where: {codewarId: id}
    })

    const codewarsQuestions = await CodewarsQuestions.findAll({
      where: {codewarId: id}
    })
    res.json({generalCodewars, codewarsLanguages, codewarsQuestions})
  } catch (err) {
    next(err)
  }
})
