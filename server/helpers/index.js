const {
  _codewarsLanguageReducer,
  _codewarsQuestionReducer,
  _codewarsUserReducer
} = require('./codewars/')
const {
  _gitRepoMapper,
  _gitCommitMapper,
  _commitResultConcat
} = require('./github/')
const {_hackernoonReducer, _getHackernoonData} = require('./hackernoon/')
const {_mediumReducer} = require('./medium/')
const {
  _stackoverflowConverter,
  _badgeMapper,
  _badgeNetworkFilter,
  _dailyReputationChange,
  _topTagFilter,
  _privilegeMapper
} = require('./stackoverflow/')

module.exports = {
  //codewars
  _codewarsLanguageReducer,
  _codewarsQuestionReducer,
  _codewarsUserReducer,
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
}
