const router = require('express').Router()
const {_getHackernoonPosts} = require('../helperfuncs/hackernoon/')

router.get('/:id/:username', async (req, res, next) => {
  const HackernoonPosts = await _getHackernoonPosts(
    req.params.username,
    req.params.id
  )
  res.json(HackernoonPosts)
})

module.exports = router
