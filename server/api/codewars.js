const router = require('express').Router()
const {Codewars, CodewarsLanguages, CodewarsQuestions} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  const userId = req.params.id
  try {
    const codewars = await Codewars.findAll({
      where: {userId}
    })
    res.json(codewars)
  } catch (err) {
    next(err)
  }
})
