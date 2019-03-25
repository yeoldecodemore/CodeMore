const axios = require('axios')
const mediumJSONFeed = require('medium-json-feed')
const {
  Codewars,
  CodewarsLanguages,
  CodewarsQuestions,
  Hackernoon,
  Medium,
  GithubRepos,
  GithubCommits,
  Stackoverflow,
  StackoverflowBadges,
  StackoverflowTopTags,
  StackoverflowBadgeNetwork,
  StackoverflowPrivileges,
  StackoverflowDailyRepChange
} = require('../db/models/')
const {
  //codewars
  _codewarsUserReducer,
  _codewarsLanguageReducer,
  _codewarsQuestionReducer,
  //github
  _gitRepoMapper,
  _gitCommitMapper,
  _commitResultConcat,
  //hackernoon
  _getHackernoonData,
  _hackernoonReducer,
  //medium
  _mediumReducer,
  //stackoverflow
  _stackoverflowConverter,
  _badgeMapper,
  _badgeNetworkFilter,
  _dailyReputationChange,
  _topTagFilter,
  _privilegeMapper
} = require('./')
const bulkUpdateOrCreate = require('./bulkUpdateOrCreate')
const updateOrCreate = require('./updateOrCreate')

const APIPicker = {
  Codewars: {
    User: {
      api: payload =>
        axios.get(`https://www.codewars.com/api/v1/users/${payload.username}`),
      dataComb: data => data.data,
      reducer: (data, payload) => _codewarsUserReducer(data, payload.userId),
      whereVals: ['userId'],
      model: Codewars,
      sqlFunc: (model, whereVals, data) =>
        updateOrCreate(model, whereVals, data)
    },
    Languages: {
      api: payload => payload.languages,
      dataComb: languages => languages,
      reducer: (data, payload) =>
        _codewarsLanguageReducer(data, payload.codewarId),
      whereVals: ['codewarId', 'languageName'],
      model: CodewarsLanguages,
      sqlFunc: (model, whereVals, data) =>
        bulkUpdateOrCreate(model, whereVals, data)
    },
    Questions: {
      api: payload =>
        axios.get(
          `https://www.codewars.com/api/v1/users/${
            payload.username
          }/code-challenges/completed?page=0`
        ),
      dataComb: data => data.data.data,
      reducer: (data, payload) =>
        _codewarsQuestionReducer(data, payload.codewarId),
      whereVals: ['codewarId', 'questionId'],
      model: CodewarsQuestions,
      sqlFunc: (model, whereVals, data) =>
        bulkUpdateOrCreate(model, whereVals, data)
    }
  },
  Medium: {
    Posts: {
      api: payload => mediumJSONFeed(payload.username),
      dataComb: data => data.response,
      reducer: (data, payload) => _mediumReducer(data, payload.userId),
      whereVals: ['userId', 'medium_id'],
      model: Medium,
      sqlFunc: (model, whereVals, data) =>
        bulkUpdateOrCreate(model, whereVals, data)
    }
  },
  Hackernoon: {
    Posts: {
      api: payload => _getHackernoonData(payload.username),
      dataComb: data => data,
      reducer: (data, payload) => _hackernoonReducer(data, payload.userId),
      whereVals: ['userId', 'url'],
      model: Hackernoon,
      sqlFunc: (model, whereVals, data) =>
        bulkUpdateOrCreate(model, whereVals, data)
    }
  },
  Github: {
    Repos: {
      api: payload =>
        axios.get(
          `https://api.github.com/users/${payload.username}/repos?client_id=${
            payload.client.id
          }&client_secret=${payload.client.secret}`
        ),
      dataComb: data => data.data,
      reducer: (data, payload) => _gitRepoMapper(data, payload.userId),
      whereVals: ['userId', 'name'],
      model: GithubRepos,
      sqlFunc: (model, whereVals, data) =>
        bulkUpdateOrCreate(model, whereVals, data)
    },
    Commits: {
      api: payload =>
        Promise.all(
          payload.gitArr.map(val =>
            axios.get(
              `https://api.github.com/repos/${val.name}/commits?client_id=${
                payload.client.id
              }&client_secret=${payload.client.secret}`
            )
          )
        ),
      dataComb: data => data.map(val => val.data),
      reducer: (data, payload) =>
        _commitResultConcat(
          _gitCommitMapper(
            data,
            payload.gitArr.map(val =>
              val.name.slice(val.name.indexOf('/') + 1)
            ),
            payload.username,
            payload.userId
          )[0]
        ),
      whereVals: ['userId', 'message'],
      model: GithubCommits,
      sqlFunc: (model, whereVals, data) =>
        bulkUpdateOrCreate(model, whereVals, data)
    }
  },
  Stackoverflow: {
    User: {
      api: payload =>
        axios.get(
          `https://api.stackexchange.com/2.2/users/${
            payload.username
          }?order=desc&sort=${payload.option.reputation}&site=${
            payload.option.site
          }&key=${payload.option.key}&filter=!-*jbN*IioeJ6`
        ),
      dataComb: data => data.data.items[0],
      reducer: (data, payload) => _stackoverflowConverter(data, payload.userId),
      whereVals: ['userId'],
      model: Stackoverflow,
      sqlFunc: (model, whereVals, data) =>
        updateOrCreate(model, whereVals, data)
    },
    Privileges: {
      api: payload =>
        axios.get(
          `https://api.stackexchange.com/2.2/users/${
            payload.username
          }/privileges?site=${payload.option.site}&key=${payload.option.key}`
        ),
      dataComb: data => data.data.items,
      reducer: (data, payload) =>
        _privilegeMapper(data, payload.stackoverflowmodelId),
      whereVals: ['stackoverflowmodelId', 'reputation'],
      model: StackoverflowPrivileges,
      sqlFunc: (model, whereVals, data) =>
        bulkUpdateOrCreate(model, whereVals, data)
    },
    DailyRep: {
      api: payload =>
        axios.get(
          `https://api.stackexchange.com/2.2/users/${
            payload.username
          }/reputation-history?site=${payload.option.site}&key=${
            payload.option.key
          }`
        ),
      dataComb: data => data.data.items,
      reducer: (data, payload) =>
        _dailyReputationChange(data, payload.stackoverflowmodelId),
      whereVals: ['stackoverflowmodelId', 'date'],
      model: StackoverflowDailyRepChange,
      sqlFunc: (model, whereVals, data) =>
        bulkUpdateOrCreate(model, whereVals, data)
    },
    BadgeNetwork: {
      api: payload =>
        axios.get(
          `https://api.stackexchange.com/2.2/users/${
            payload.username
          }/network-activity?key=${payload.option.key}`
        ),
      dataComb: data => data.data.items,
      reducer: (data, payload) =>
        _badgeNetworkFilter(data, payload.stackoverflowmodelId),
      whereVals: ['stackoverflowmodelId', 'creationDate'],
      model: StackoverflowBadgeNetwork,
      sqlFunc: (model, whereVals, data) =>
        bulkUpdateOrCreate(model, whereVals, data)
    },
    Badges: {
      api: payload =>
        axios.get(
          `https://api.stackexchange.com/2.2/users/${
            payload.username
          }/badges?order=desc&sort=${payload.option.rank}&site=${
            payload.option.site
          }&key=${payload.option.key}`
        ),
      dataComb: data => data.data.items,
      reducer: (data, payload) =>
        _badgeMapper(data, payload.stackoverflowmodelId),
      whereVals: ['stackoverflowmodelId', 'badge_name'],
      model: StackoverflowBadges,
      sqlFunc: (model, whereVals, data) =>
        bulkUpdateOrCreate(model, whereVals, data)
    },
    TopTags: {
      api: payload =>
        axios.get(
          `https://api.stackexchange.com/2.2/users/${
            payload.username
          }/top-tags?site=${payload.option.site}&key=${payload.option.key}`
        ),
      dataComb: data => data.data.items,
      reducer: (data, payload) =>
        _topTagFilter(data, payload.stackoverflowmodelId),
      whereVals: ['stackoverflowmodelId', 'tagName'],
      model: StackoverflowTopTags,
      sqlFunc: (model, whereVals, data) =>
        bulkUpdateOrCreate(model, whereVals, data)
    }
  }
}

module.exports = APIPicker
