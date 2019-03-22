const router = require('express').Router()
const {
  _callGithubReposAPI,
  _callGithubCommitsAPI
} = require('../helperfuncs/githubDataFuncs')

router.get('/:id/:username', async (req, res, next) => {
  try {
    const [gitArr, gitrepos] = await _callGithubReposAPI(
      req.params.username,
      req.params.id
    )

    const [repos, commits] = await _callGithubCommitsAPI(
      gitArr,
      gitrepos,
      req.params.username,
      req.params.id
    )

    res.json({repos, commits})
  } catch (error) {
    next(error)
  }
})

module.exports = router
