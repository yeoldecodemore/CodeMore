const router = require('express').Router()
const {Problem, Test} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const problems = await Problem.findAll()
    res.json(problems)
  } catch (error) {
    next(error)
  }
})

router.get('/allTests', async (req, res, next) => {
  try {
    const tests = await Test.findAll()
    res.json(tests)
  } catch (err) {
    next(err)
  }
})
