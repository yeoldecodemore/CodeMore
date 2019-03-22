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
} = require('./')

let option = {
  key: '1LHCjH34p7CHUvnyfz0jNQ((',
  site: 'stackoverflow',
  rank: 'rank',
  reputation: 'reputation',
  activity: 'activity',
  popular: 'popular'
}
const _callStackoverflowUserAPI = async (username, id) => {
  const data = await axios.get(
    `https://api.stackexchange.com/2.2/users/${username}?order=desc&sort=${
      option.reputation
    }&site=${option.site}&key=${option.key}&filter=!-*jbN*IioeJ6`
  )
  const stackuser = await Stackoverflow.create(
    _stackoverflowConverter(...data.data.items, id)
  )
  return stackuser
}

const _callStackoverflowBadgeAPI = async (username, id) => {
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

const _callStackoverflowTopTagsAPI = async (username, id) => {
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
const _callStackoverflowBadgeNetworkAPI = async (username, id) => {
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
const _callStackoverflowPrivilegesAPI = async (username, id) => {
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
const _callStackoverflowDailyRepAPI = async (username, id) => {
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
module.exports = {
  _callStackoverflowUserAPI,
  _callStackoverflowTopTagsAPI,
  _callStackoverflowBadgeAPI,
  _callStackoverflowBadgeNetworkAPI,
  _callStackoverflowPrivilegesAPI,
  _callStackoverflowDailyRepAPI
}
