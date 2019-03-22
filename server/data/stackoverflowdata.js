const router = require('express').Router()
const {
  _callStackoverflowUserAPI,
  _callStackoverflowTopTagsAPI,
  _callStackoverflowBadgeAPI,
  _callStackoverflowBadgeNetworkAPI,
  _callStackoverflowPrivilegesAPI,
  _callStackoverflowDailyRepAPI
} = require('../helperfuncs/stackoverflowDataFuncs')

router.get('/:id/:username', async (req, res, next) => {
  try {
    const stackUser = await _callStackoverflowUserAPI(
      req.params.username,
      req.params.id
    )
    const {id} = stackUser.get({plain: true})
    const stackBadges = await _callStackoverflowBadgeAPI(
      req.params.username,
      id
    )
    const stackTags = await _callStackoverflowTopTagsAPI(
      req.params.username,
      id
    )
    const stackBadgenetwork = await _callStackoverflowBadgeNetworkAPI(
      req.params.username,
      id
    )
    const stackPrivileges = await _callStackoverflowPrivilegesAPI(
      req.params.username,
      id
    )
    const stackDailyRep = await _callStackoverflowDailyRepAPI(
      req.params.username,
      id
    )
    res.json({
      stackUser,
      stackBadges,
      stackTags,
      stackBadgenetwork,
      stackPrivileges,
      stackDailyRep
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
