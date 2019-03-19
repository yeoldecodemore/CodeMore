const router = require('express').Router()
const {User} = require('../db/models')
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

router.put('/:id', (req, res, next) => {
  const id = req.params.id
  console.log('here')
  User.update(req.body, {where: {id}, returning: true})
    .then(([numRow, [user]]) => res.json(user))
    .catch(next)
})
