const router = require('express').Router()
const hackernoonCommand = require('../helpers/APICommand')('Hackernoon')
const hackernoonCall = require('../helpers/APICall')('Hackernoon')
router.get('/:userId', async (req, res, next) => {
  const {userId} = req.params
  try {
    const HackernoonPosts = await hackernoonCommand('Posts', 'findAll', {
      userId
    })
    res.json(HackernoonPosts)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/:username', async (req, res, next) => {
  const {userId, username} = req.params
  try {
    const [HackernoonPosts] = await hackernoonCall('Posts', {
      username,
      userId
    })
    res.json(HackernoonPosts)
  } catch (err) {
    next(err)
  }
})

module.exports = router
