const router = require('express').Router()
const {_callHackernoonPostsApi} = require('../helperfuncs/hackernoonDataFuncs')

router.get('/:id/:username', async (req, res, next) => {
  const HackernoonInstance = await _callHackernoonPostsApi(
    req.params.username,
    req.params.id
  )
  res.json(HackernoonInstance)
})

module.exports = router
