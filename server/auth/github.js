const passport = require('passport')
const router = require('express').Router()
const GitHubStrategy = require('passport-github').Strategy
const {User} = require('../db/models')
module.exports = router

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  console.log('Github client ID / secret not found. Skipping Github OAuth.')
} else {
  console.log('inGithub oauth')
  const githubConfig = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK
    // scope: 'user:email'
  }

  const strategy = new GitHubStrategy(
    githubConfig,
    (token, refreshToken, profile, done) => {
      console.log('--------', profile)
      const githubId = profile.id
      const name = profile.displayName
      const email = profile.emails[0].value

      User.findOrCreate({
        where: {githubId},
        defaults: {name, email}
      })
        .then(([user]) => done(null, user))
        .catch(done)
    }
  )

  passport.use(strategy)

  router.get('/', passport.authenticate('github', {scope: ['user:email']}))

  router.get(
    '/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/home')
    }
  )
  // router.get(
  //   '/callback',
  //   passport.authenticate('github', {
  //     successRedirect: '/home',
  //     failureRedirect: '/login'
  //   })
  // )
}
