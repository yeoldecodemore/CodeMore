const router = require('express').Router()
const {_getMediumPost} = require('../helperfuncs/medium/')

router.get('/:id/:username', async (req, res, next) => {
  try {
    const MediumPosts = await _getMediumPost(req.params.username, req.params.id)
    res.json(MediumPosts)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
