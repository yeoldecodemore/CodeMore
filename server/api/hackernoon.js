const router = require('express').Router()
const axios = require('axios')
const {HackerNoon} = require('../db/models')
const {_getHackerNoonData} = require('../scrape')
const {_hackerNoonReducer} = require('../helperfuncs')

router.get('/:id/:username', async (req, res, next) => {
  try {
    const userId = req.params.id
    //removed name from general data
    const data = await _getHackerNoonData(req.params.username)

    HackerNoon.bulkCreate(_hackerNoonReducer(data, userId), {
      returning: true
    }).then(HackerNoonInstance => {
      res.json(HackerNoonInstance)
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
