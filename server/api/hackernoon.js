const router = require('express').Router()
const {HackerNoon} = require('../db/models')
const {_getHackerNoonData} = require('../scrape')
const {_hackerNoonReducer} = require('../helperfuncs')

router.get('/:id/:username', async (req, res, next) => {
  console.log('@@#$#$HERE', req.params.username)
  const data = await _getHackerNoonData(req.params.username)
  HackerNoon.bulkCreate(_hackerNoonReducer(data, req.params.id), {
    returning: true
  })
    .then(HackerNoonInstance => {
      res.json(HackerNoonInstance)
    })
    .catch(next)
})

module.exports = router
