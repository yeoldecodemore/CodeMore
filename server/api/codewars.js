const router = require('express').Router()
const axios = require('axios')
const {Codewars} = require('../db/models')
module.exports = router

router.get('/:username', async (req, res, next) => {
  try {
    const data = await axios.get(
      `https://www.codewars.com/api/v1/users/${req.params.username}`
    )
    const codewarInstance = await Codewars.create(data)
    res.json(codewarInstance)
  } catch (err) {
    next(err)
  }
})
