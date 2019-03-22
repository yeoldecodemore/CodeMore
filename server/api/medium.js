const router = require('express').Router()
const {Medium} = require('../db/models')

router.get('/:id', async (req, res, next) => {
  const userId = req.params.id
  try {
    const MediumPosts = await Medium.findAll({
      where: {userId}
    })

    res.json(MediumPosts)
  } catch (err) {
    next(err)
  }
})

module.exports = router
