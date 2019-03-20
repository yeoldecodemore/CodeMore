const router = require('express').Router()
const axios = require('axios')
//erina create model

router.get('/test', async (req, res, next) => {
  try {
    const clientid = process.env.GITHUB_CLIENT_ID
    const clientsecret = process.env.GITHUB_CLIENT_SECRET
    const {data} = await axios.get(
      `https://api.github.com/users/erinakii/repos?client_id=${clientid}&client_secret=${clientsecret}`
    )
    res.json(data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
