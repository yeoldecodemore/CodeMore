const router = require('express').Router()
const {Hackernoon} = require('../db/models')

router.get('/:id', async (req, res, next) => {
  const userId = req.params.id
  try {
    const HackernoonPosts = await Hackernoon.findAll({
      where: {userId}
    })

    res.json(HackernoonPosts)
  } catch (err) {
    next(err)
  }
})

module.exports = router
