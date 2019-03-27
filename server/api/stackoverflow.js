const router = require('express').Router()

const stackoverflowCommand = require('../helpers/APICommand')('Stackoverflow')
const stackoverflowCall = require('../helpers/APICall')('Stackoverflow')

router.get('/:userId', async (req, res, next) => {
  const {userId} = req.params
  try {
    const generalStack = await stackoverflowCommand('User', 'findOne', {
      userId
    })

    const stackoverflowmodelId = generalStack.get({plain: true}).id

    const stackBadges = await stackoverflowCommand('Badges', 'findAll', {
      stackoverflowmodelId
    })

    const stackTopTags = await stackoverflowCommand('TopTags', 'findAll', {
      stackoverflowmodelId
    })
    const stackBadgeNetwork = await stackoverflowCommand(
      'BadgeNetwork',
      'findAll',
      {
        stackoverflowmodelId
      }
    )
    const stackPrivileges = await stackoverflowCommand(
      'Privileges',
      'findAll',
      {
        stackoverflowmodelId
      }
    )
    const stackDailyRep = await stackoverflowCommand('DailyRep', 'findAll', {
      stackoverflowmodelId
    })

    res.json({
      generalStack,
      stackBadges,
      stackTopTags,
      stackBadgeNetwork,
      stackPrivileges,
      stackDailyRep
    })
  } catch (err) {
    next(err)
  }
})
const option = {
  key: '1LHCjH34p7CHUvnyfz0jNQ((',
  site: 'stackoverflow',
  rank: 'rank',
  reputation: 'reputation',
  activity: 'activity',
  popular: 'popular'
}
router.get('/:userId/:username', async (req, res, next) => {
  const {userId, username} = req.params
  try {
    //look if one exists
    const stackUser = await stackoverflowCommand('User', 'findOne', {userId})
    // get username if exists
    const currUsername = stackUser
      ? stackUser.get({plain: true}).stackoverflowId
      : null
    //call
    const [generalStack] = await stackoverflowCall('User', {
      username,
      userId,
      option
    })

    const stackoverflowmodelId = generalStack.get({plain: true}).id

    //if current username exists (not new account)
    //if current username is not the same as what was just passed in
    if (currUsername && currUsername !== username) {
      await stackoverflowCommand('Badges', 'destroy', {stackoverflowmodelId})
      await stackoverflowCommand('TopTags', 'destroy', {stackoverflowmodelId})
      await stackoverflowCommand('BadgeNetwork', 'destroy', {
        stackoverflowmodelId
      })
      await stackoverflowCommand('Privileges', 'destroy', {
        stackoverflowmodelId
      })
      await stackoverflowCommand('DailyRep', 'destroy', {stackoverflowmodelId})
    }
    const [stackBadges] = await stackoverflowCall('Badges', {
      username,
      stackoverflowmodelId,
      option
    })
    const [stackTopTags] = await stackoverflowCall('TopTags', {
      username,
      stackoverflowmodelId,
      option
    })
    const [stackBadgeNetwork] = await stackoverflowCall('BadgeNetwork', {
      username,
      stackoverflowmodelId,
      option
    })
    const [stackPrivileges] = await stackoverflowCall('Privileges', {
      username,
      stackoverflowmodelId,
      option
    })
    const [stackDailyRep] = await stackoverflowCall('DailyRep', {
      username,
      stackoverflowmodelId,
      option
    })

    res.json({
      generalStack,
      stackBadges,
      stackTopTags,
      stackBadgeNetwork,
      stackPrivileges,
      stackDailyRep
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
