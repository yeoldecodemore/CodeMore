const router = require('express').Router()
const {_callMediumPostAPI} = require('../helperfuncs/mediumDataFuncs')

router.get('/:id/:username', async (req, res, next) => {
  try {
    const MediumPosts = await _callMediumPostAPI(
      req.params.username,
      req.params.id
    )
    res.json(MediumPosts)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
