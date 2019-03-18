const passport = require('passport')
const router = require('express').Router()
const GitHubStrategy = require('passport-github').Strategy
const {User, Github} = require('../db/models')
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
      const {
        profileUrl,
        username,
        _json: {
          id,
          name,
          avatar_url,
          type,
          site_admin,
          public_repos,
          public_gists,
          followers,
          following,
          created_at
        }
      } = profile

      const githubId = id
      const space = name.indexOf(' ')
      const firstName = name.slice(0, space)
      const lastName = name.slice(space + 1, name.length)

      User.findOrCreate({
        where: {githubId},
        defaults: {
          firstName,
          lastName,
          profileUrl,
          type,
          imageUrl: avatar_url,
          site_admin,
          public_repos,
          public_gists,
          followers,
          following,
          git_created_at: created_at
        }
      })
        .then(([user]) => done(null, user))
        .catch(done)
    }
  )

  passport.use(strategy)

  router.get('/', passport.authenticate('github', {scope: ['user:email']}))

  router.get(
    '/callback',
    passport.authenticate('github', {failureRedirect: '/'}),
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
