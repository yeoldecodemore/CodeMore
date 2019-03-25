const router = require('express').Router()
const codewarsCommand = require('../helpers/APICommand')('Codewars')
const codewarsCall = require('../helpers/APICall')('Codewars')

router.get('/:userId', async (req, res, next) => {
  const {userId} = req.params
  try {
    const generalCodewars = await codewarsCommand('User', 'findOne', {
      userId
    })
    const codewarId = generalCodewars
      ? generalCodewars.get({plain: true}).id
      : null


    const codewarsLanguages = await codewarsCommand('Languages', 'findAll', {
      codewarId
    })

    const codewarsQuestions = await codewarsCommand('Questions', 'findAll', {
      codewarId

    })

    res.json({generalCodewars, codewarsLanguages, codewarsQuestions})
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/:username', async (req, res, next) => {
  const {userId, username} = req.params
  try {
    //look if one exists
    const codewarsUser = await codewarsCommand('User', 'findOne', {
      userId
    })

    // get username if exists
    const currUsername = codewarsUser
      ? codewarsUser.get({plain: true}).username
      : null

    //call
    const [generalCodewars, languages] = await codewarsCall('User', {
      username,
      userId
    })

    const codewarId = generalCodewars.get({plain: true}).id

    //if current username exists (not new account)
    //if current username is not the same as what was just passed in
    if (currUsername && currUsername !== username) {
      await codewarsCommand('Languages', 'destroy', {codewarId})
      await codewarsCommand('Questions', 'destroy', {codewarId})
    }
    const [codewarsLanguages] = await codewarsCall('Languages', {
      languages,
      codewarId
    })

    const [codewarsQuestions] = await codewarsCall('Questions', {
      username,
      codewarId
    })
    res.json({generalCodewars, codewarsLanguages, codewarsQuestions})
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
