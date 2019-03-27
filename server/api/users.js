const router = require('express').Router()
const {User} = require('../db/models')
const updateOrCreate = require('../helpers/updateOrCreate')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/stats', (req, res, next) => {
  updateOrCreate(User)
  res.send()
  // (req.body, {where: {id}, returning: true})
  //   .then(([numRow, [user]]) => res.json(user))
  //   .catch(next)
})

router.put('/:id', (req, res, next) => {
  const id = req.params.id
  User.update(req.body, {where: {id}, returning: true})
    .then(([numRow, [user]]) => res.json(user))
    .catch(next)
})
