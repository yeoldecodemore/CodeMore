const router = require('express').Router()
const {GithubCommits, GithubRepos} = require('../db/models')

router.get('/:id', async (req, res, next) => {
  const userId = req.params.id
  try {
    const repos = await GithubRepos.findAll({
      where: {userId}
    })

    const commits = await GithubCommits.findAll({
      where: {userId}
    })

    res.json({repos, commits})
  } catch (err) {
    next(err)
  }
})

module.exports = router
