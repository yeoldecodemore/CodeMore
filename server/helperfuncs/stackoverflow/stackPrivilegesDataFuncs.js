const axios = require('axios')
const {StackoverflowPrivileges} = require('../../db/models')
const {_privilegeMapper} = require('./helperfuncs/')
const _bulkUpdateorCreate = require('../bulkUpdateorCreate')

const _callStackPrivilegesAPI = async (username, option) => {
  const data = await axios.get(
    ` https://api.stackexchange.com/2.2/users/${username}/privileges?site=${
      option.site
    }&key=${option.key}`
  )
  return data.data.items
}

const _getStackPrivileges = async (username, id, option) => {
  const data = await _callStackPrivilegesAPI(username, option)

  const stackPrivileges = await _bulkUpdateorCreate(
    _privilegeMapper(data, id),
    ['stackoverflowmodelId', 'reputation'],
    StackoverflowPrivileges
  )
  return stackPrivileges
}

module.exports = _getStackPrivileges

//category (codewars, etc)
//api address (needs to be a function to give info)

//model
//helperfunc with inputs
//whereVals

// how do i know what hte payload is?

// when the request is MediaDeviceInfo, it is whatever is passed in

const picker = {
  _getStackPrivileges: {
    type: 'bulk',
    api: payload =>
      axios.get(
        `https://api.stackexchange.com/2.2/users/${
          payload.username
        }/privileges?site=${payload.option.site}&key=${payload.option.key}`
      ),
    apiData: data => data.data.items,
    model: StackoverflowPrivileges,
    helper: (data, payload) => _privilegeMapper(data, payload.id),
    whereVals: ['stackoverflowmodelId', 'reputation']
  },
  _getStackDailyRep: {
    type: 'bulk',
    api: payload =>
      axios.get(
        `https://api.stackexchange.com/2.2/users/${
          payload.username
        }/reputation-history?site=${payload.option.site}&key=${
          payload.option.key
        }`
      ),
    apiData: data => data.data.items,
    model: StackoverflowDailyRepChange,
    helper: (data, payload) => _dailyReputationChange(data, payload.id),
    whereVals: ['stackoverflowmodelId', 'date']
  },
  _getStackBadgeNetwork: {
    type: 'bulk',
    api: payload =>
      axios.get(
        `https://api.stackexchange.com/2.2/users/${
          payload.username
        }/network-activity?key=${payload.option.key}`
      ),
    apiData: data => data.data.items,
    model: StackoverflowBadgeNetwork,
    helper: (data, payload) => _badgeNetworkFilter(data, payload.id),
    whereVals: ['stackoverflowmodelId', 'creationDate']
  },
  _getStackBadges: {
    type: 'bulk',
    api: payload =>
      axios.get(
        `https://api.stackexchange.com/2.2/users/${
          payload.username
        }/badges?order=desc&sort=${payload.option.rank}&site=${
          payload.option.site
        }&key=${payload.option.key}`
      ),
    apiData: data => data.data.items,
    model: StackoverflowBadges,
    helper: (data, payload) => _badgeMapper(data, payload.id),
    whereVals: ['stackoverflowmodelId', 'badge_name']
  },
  _getStackTopTags: {
    type: 'bulk',
    api: payload =>
      axios.get(
        `https://api.stackexchange.com/2.2/users/${
          payload.username
        }/top-tags?site=${payload.option.site}&key=${payload.option.key}`
      ),
    apiData: data => data.data.items,
    model: StackoverflowTopTags,
    helper: (data, payload) => _topTagFilter(data, payload.id),
    whereVals: ['stackoverflowmodelId', 'tagName']
  },
  _getMediumPost: {
    type: 'bulk',
    api: payload => mediumJSONFeed(payload.username),
    apiData: data => data.response,
    model: Medium,
    helper: (data, payload) => _mediumReducer(data, payload.id),
    whereVals: ['userId', 'title']
  },
  _getHackernoonPosts: {
    type: 'bulk',
    api: payload => _getHackernoonData(payload.username),
    apiData: data => data,
    model: Hackernoon,
    helper: (data, payload) => _hackerNoonReducer(data, payload.id),
    whereVals: ['userId', 'title']
  },
  _getCodewarsQuestions: {
    type: 'bulk',
    api: payload =>
      axios.get(
        `https://www.codewars.com/api/v1/users/${
          payload.username
        }/code-challenges/completed?page=0`
      ),
    apiData: data => data.data,
    model: CodewarsQuestions,
    helper: (data, payload) => _codewarsQuestionsReducer(data, payload.id),
    whereVals: ['codewarId', 'questionId']
  },
  _getCodewarsLanguages: {
    run: 'bulk',
    api: payload => payload.languages,
    apiData: languages => languages,
    model: CodewarsLanguages,
    helper: (data, payload) => _codeWarsLanguageReducer(data, payload.id),
    whereVals: ['codewarId', 'languageName']
  }
}

//what if there is no api... FAKE IT

// switch statement on picker[category].type
// const {api, apiData, model, helper, whereVals} = picker[category]
// const data = await axios.get(api(payload))
// const result = await _bulkUpdateorCreate(helper(apiData(data), payload), whereValues, model)
