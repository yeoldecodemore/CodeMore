const router = require('express').Router()
module.exports = router

router.use('/data', require('../data/data'))
router.use('/users', require('./users'))
router.use('/docker', require('./docker'))
router.use('/problems', require('./problems'))
router.use('/codewars', require('./codewars'))
// router.use('/hackernoon', require('./hackernoon'))
// router.use('/medium', require('./medium'))
// router.use('/stackoverflow', require('./stackoverflow'))
// router.use('/github', require('./github'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
