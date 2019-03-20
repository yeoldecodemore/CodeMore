const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/docker', require('./docker'))
router.use('/problems', require('./problems'))
router.use('/codewars', require('./codewars'))
router.use('/hackernoon', require('./hackernoon'))
router.use('/github', require('./github'))
router.use('/dockerode', require('./dockerode'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
