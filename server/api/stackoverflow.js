const router = require('express').Router()
const axios = require('axios')
const {
  Stackoverflow,
  StackoverflowBadges,
  StackoverflowTopTags,
  StackoverflowBadgeNetwork,
  StackoverflowPrivileges,
  StackoverflowDailyRepChange
} = require('../db/models')

const {
  _badgeMapper,
  _stackoverflowConverter,
  _topTagFilter,
  _badgeNetworkFilter,
  _dailyReputationChange,
  _privilegeMapper
} = require('../helperfuncs')

let option = {
  key: '1LHCjH34p7CHUvnyfz0jNQ((',
  site: 'stackoverflow',
  rank: 'rank',
  reputation: 'reputation',
  activity: 'activity',
  popular: 'popular'
}

getStackoverflowUser = async (username, id) => {
  let data = await axios.get(
    `https://api.stackexchange.com/2.2/users/${username}?order=desc&sort=${
      option.reputation
    }&site=${option.site}&key=${option.key}&filter=!-*jbN*IioeJ6`
  )
  const user = _stackoverflowConverter(...data.data.items, id)
  const stackuser = await Stackoverflow.create(user)
  return stackuser
}

getStackoverflowBadge = async (username, id) => {
  let data = await axios.get(
    `https://api.stackexchange.com/2.2/users/${username}/badges?order=desc&sort=${
      option.rank
    }&site=${option.site}&key=${option.key}`
  )
  const stackbadges = await StackoverflowBadges.bulkCreate(
    _badgeMapper(data.data.items, id),
    {returning: true}
  )
  return stackbadges
}

getStackoverflowTopTags = async (username, id) => {
  let data = await axios.get(
    `https://api.stackexchange.com/2.2/users/${username}/top-tags?site=${
      option.site
    }&key=${option.key}`
  )
  const stacktags = await StackoverflowTopTags.bulkCreate(
    _topTagFilter(data.data.items, id),
    {returning: true}
  )
  return stacktags
}
getStackoverflowBadgeNetwork = async (username, id) => {
  let data = await axios.get(
    `    https://api.stackexchange.com/2.2/users/${username}/network-activity?key=${
      option.key
    }`
  )
  const stackbadgenetwork = await StackoverflowBadgeNetwork.bulkCreate(
    _badgeNetworkFilter(data.data.items, id),
    {returning: true}
  )
  return stackbadgenetwork
}
getStackoverflowPrivileges = async (username, id) => {
  let data = await axios.get(
    ` https://api.stackexchange.com/2.2/users/${username}/privileges?site=${
      option.site
    }&key=${option.key}`
  )
  const stackprivileges = await StackoverflowPrivileges.bulkCreate(
    _privilegeMapper(data.data.items, id),
    {returning: true}
  )
  return stackprivileges
}
getStackoverflowDailyRepChange = async (username, id) => {
  let data = await axios.get(
    `https://api.stackexchange.com/2.2/users/${username}/reputation-history?site=${
      option.site
    }&key=${option.key}`
  )
  const stackdailyrep = await StackoverflowDailyRepChange.bulkCreate(
    _dailyReputationChange(data.data.items, id),
    {returning: true}
  )
  return stackdailyrep
}
// getStackoverflowDailyRep = async (username, id) => {
//   let data = await axios.get(
//     `https://api.stackexchange.com/2.2/users/${username}/reputation?fromdate=946684800&site=${
//       option.site
//     }&key=${option.key}&filter=!-.p)pq5FR1dT`
//   )

//   const dailyRepChange = _dailyReputationChange(data.data.items, id)
//   console.log(dailyRepChange)
// }
router.get('/:id/:username', async (req, res, next) => {
  try {
    const stackuser = await getStackoverflowUser(
      req.params.username,
      req.params.id
    )
    const {id} = stackuser.get({plain: true})
    const stackbadges = await getStackoverflowBadge(req.params.username, id)
    const stacktags = await getStackoverflowTopTags(req.params.username, id)
    const stackbadgenetwork = await getStackoverflowBadgeNetwork(
      req.params.username,
      id
    )
    const stackprivileges = await getStackoverflowPrivileges(
      req.params.username,
      id
    )
    const stackdailyrep = await getStackoverflowDailyRepChange(
      req.params.username,
      id
    )
    res.json({
      stackuser,
      stackbadges,
      stacktags,
      stackbadgenetwork,
      stackprivileges,
      stackdailyrep
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
