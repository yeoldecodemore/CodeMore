const router = require('express').Router()
const {_getGithubCommits, _getGithubRepos} = require('../helperfuncs/github/')

const client = {
  id: process.env.GITHUB_CLIENT_ID,
  secret: process.env.GITHUB_CLIENT_SECRET
}
router.get('/:id/:username', async (req, res, next) => {
  try {
    const [gitArr, gitrepos] = await _getGithubRepos(
      req.params.username,
      req.params.id,
      client
    )

    const [repos, commits] = await _getGithubCommits(
      gitArr,
      gitrepos,
      req.params.username,
      req.params.id,
      client
    )

    res.json({repos, commits})
  } catch (error) {
    next(error)
  }
})

module.exports = router
