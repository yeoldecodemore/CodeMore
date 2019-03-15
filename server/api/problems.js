const router = require('express').Router()
const {Problem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const problems = await Problem.findAll()
    res.json(problems)
  } catch (error) {
    next(error)
  }
})

router.get('/:problemName', async (req, res, next) => {
  try {
    const probSlug = req.params.problemName
    const problem = await Problem.findOne({
      where: {
        problemSlug: probSlug
      }
    })
    res.json(problem)
  } catch (error) {
    next(error)
  }
})
