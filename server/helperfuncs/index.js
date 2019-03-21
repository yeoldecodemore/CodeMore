const _codeWarsLanguageReducer = require('./codeWarsLanguageReducer')
const _stackoverflowConverter = require('./stackoverflowConverter')
const _codeWarsQuestionsReducer = require('./codeWarsQuestionsReducer')
const _hackerNoonReducer = require('./hackerNoonReducer')
const _mediumReducer = require('./mediumReducer')
const _badgeMapper = require('./badgeMapper')
const _answersMapper = require('./answersMapper')
const _topTagFilter = require('./topTagFilter')
const _badgeNetworkFilter = require('./badgeNetworkFilter')
const _dailyReputationChange = require('./dailyReputationChange')
const _privilegeMapper = require('./privilegeMapper')
const _gitRepoMapper = require('./gitRepoMapper')
const _gitCommitMapper = require('./gitCommitMapper')
const _commitResultConcat = require('./commitResultConcat')

module.exports = {
  _codeWarsLanguageReducer,
  _codeWarsQuestionsReducer,
  _hackerNoonReducer,
  _stackoverflowConverter,
  _mediumReducer,
  _badgeMapper,
  _commitResultConcat,
  _badgeNetworkFilter,
  _gitRepoMapper,
  _answersMapper,
  _gitCommitMapper,
  _dailyReputationChange,
  _topTagFilter,
  _privilegeMapper
}
