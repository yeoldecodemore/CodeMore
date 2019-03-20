const router = require('express').Router()
const {Medium} = require('../db/models')
const mediumJSONFeed = require('medium-json-feed')
const {_mediumReducer} = require('../helperfuncs')

router.get('/:id/:username', async (req, res, next) => {
  try {
    const {response} = await mediumJSONFeed(`@${req.params.username}`)
    const MediumInstance = Medium.bulkCreate(
      _mediumReducer(response, req.params.id),
      {returning: true}
    )
    res.json(MediumInstance)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
