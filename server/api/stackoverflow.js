const router = require('express').Router()
const {
  Stackoverflow,
  StackoverflowBadgeNetwork,
  StackoverflowBadges,
  StackoverflowDailyRepChange,
  StackoverflowPrivileges,
  StackoverflowTopTags
} = require('../db/models')

router.get('/:id', async (req, res, next) => {
  const userId = req.params.id
  try {
    const stackUser = await Stackoverflow.findOne({
      where: {userId}
    })

    const {id} = stackUser.get({plain: true})

    const stackBadges = StackoverflowBadges.findAll({
      where: {stackoverflowmodelId: id}
    })

    const stackTopTags = StackoverflowTopTags.findAll({
      where: {stackoverflowmodelId: id}
    })
    const stackBadgenetwork = StackoverflowBadgeNetwork.findAll({
      where: {stackoverflowmodelId: id}
    })
    const stackPrivileges = StackoverflowPrivileges.findAll({
      where: {stackoverflowmodelId: id}
    })

    const stackDailyRep = StackoverflowDailyRepChange.findAll({
      where: {stackoverflowmodelId: id}
    })

    res.json({
      stackUser,
      stackBadges,
      stackTopTags,
      stackBadgenetwork,
      stackPrivileges,
      stackDailyRep
    })
  } catch (err) {
    next(err)
  }
})
module.exports = router
