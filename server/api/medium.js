const router = require('express').Router()
const mediumCommand = require('../helpers/APICommand')('Medium')
const mediumCall = require('../helpers/APICall')('Medium')
router.get('/:userId', async (req, res, next) => {
  const {userId} = req.params
  try {
    const MediumPosts = await mediumCommand('Posts', 'findAll', {
      userId
    })
    res.json(MediumPosts)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/:username', async (req, res, next) => {
  const {userId, username} = req.params
  try {
    const [MediumPosts] = await mediumCall('Posts', {
      username,
      userId
    })
    res.json(MediumPosts)
  } catch (err) {
    next(err)
  }
})

module.exports = router
