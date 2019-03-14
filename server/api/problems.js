const router = require('express').Router()
const {Problem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    res.send()
  } catch (error) {
    next(error)
  }
})
