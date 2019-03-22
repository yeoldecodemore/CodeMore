const router = require('express').Router()
module.exports = router

router.use('/codewars', require('./codewarsdata'))
router.use('/hackernoon', require('./hackernoondata'))
router.use('/medium', require('./mediumdata'))
router.use('/stackoverflow', require('./stackoverflowdata'))
//router.use('/github', require('./githubdata'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
