const router = require('express').Router()
const {
  _getStackDailyRep,
  _getStackBadges,
  _getStackBadgeNetwork,
  _getStackTopTags,
  _getStackPrivileges,
  _getStackUser
} = require('../helperfuncs/stackoverflow/')

const option = {
  key: '1LHCjH34p7CHUvnyfz0jNQ((',
  site: 'stackoverflow',
  rank: 'rank',
  reputation: 'reputation',
  activity: 'activity',
  popular: 'popular'
}
router.get('/:id/:username', async (req, res, next) => {
  try {
    const stackUser = await _getStackUser(
      req.params.username,
      req.params.id,
      option
    )
    const {id} = stackUser.get({plain: true})
    console.log('*****', id)

    const stackBadges = await _getStackBadges(req.params.username, id, option)
    const stackTopTags = await _getStackTopTags(req.params.username, id, option)
    const stackBadgenetwork = await _getStackBadgeNetwork(
      req.params.username,
      id,
      option
    )
    const stackPrivileges = await _getStackPrivileges(
      req.params.username,
      id,
      option
    )
    const stackDailyRep = await _getStackDailyRep(
      req.params.username,
      id,
      option
    )
    res.json({
      stackUser,
      stackBadges,
      stackTopTags,
      stackBadgenetwork,
      stackPrivileges,
      stackDailyRep
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
