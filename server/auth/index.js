const router = require('express').Router()
module.exports = router

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/github', require('./github'))
// router.use('/google', require('./google'))
