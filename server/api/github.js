const router = require('express').Router()

const githubCommand = require('../helpers/APICommand')('Github')
const githubCall = require('../helpers/APICall')('Github')

const client = {
  id: process.env.GITHUB_CLIENT_ID,
  secret: process.env.GITHUB_CLIENT_SECRET
}

router.get('/:userId', async (req, res, next) => {
  const {userId} = req.params
  try {
    const repos = await githubCommand('Repos', 'findAll', {
      userId
    })
    const commits = await githubCommand('Commits', 'findAll', {
      userId
    })

    res.json({repos, commits})
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/:username', async (req, res, next) => {
  const {userId, username} = req.params
  try {
    const [repos, gitArr] = await githubCall('Repos', {
      username,
      userId,
      client
    })

    const [commits] = await githubCall('Commits', {
      gitArr,
      username,
      userId,
      client
    })

    res.json({repos, commits})
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
