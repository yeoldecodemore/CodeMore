const User = require('./user')
const UserStats = require('./userstats')
const Problem = require('./problem')
const Test = require('./test')
const Codewars = require('./codewars')
const CodewarsLanguages = require('./codewarslanguages')
const CodewarsQuestions = require('./codewarsquestions')
const Hackernoon = require('./hackernoon')
const Medium = require('./medium')
const Stackoverflow = require('./stackoverflow')
const StackoverflowBadges = require('./stackoverflowbadges')
const StackoverflowTopTags = require('./stackoverflowtoptags')
const StackoverflowBadgeNetwork = require('./stackoverflowbadgenetwork')
const StackoverflowPrivileges = require('./stackoverflowprivileges')
const StackoverflowDailyRepChange = require('./stackoverflowdailyrep')
const GithubRepos = require('./githubrepos')
const GithubCommits = require('./githubcommits')

User.hasOne(Codewars)
//Codewars.belongsTo(User)
Codewars.hasMany(CodewarsLanguages)
CodewarsLanguages.belongsTo(Codewars)
Codewars.hasMany(CodewarsQuestions)
CodewarsQuestions.belongsTo(Codewars)

User.hasOne(Stackoverflow)
Stackoverflow.belongsTo(User)
Stackoverflow.hasMany(StackoverflowBadges)
StackoverflowBadges.belongsTo(Stackoverflow)
Stackoverflow.hasMany(StackoverflowTopTags)
StackoverflowTopTags.belongsTo(Stackoverflow)
Stackoverflow.hasMany(StackoverflowBadgeNetwork)
StackoverflowBadgeNetwork.belongsTo(Stackoverflow)
Stackoverflow.hasMany(StackoverflowPrivileges)
StackoverflowPrivileges.belongsTo(Stackoverflow)
Stackoverflow.hasMany(StackoverflowDailyRepChange)
StackoverflowDailyRepChange.belongsTo(Stackoverflow)

User.hasMany(Hackernoon)
Hackernoon.belongsTo(User)

User.hasMany(Medium)
Medium.belongsTo(User)

User.hasMany(GithubRepos)
GithubRepos.belongsTo(User)
User.hasMany(GithubCommits)
GithubCommits.belongsTo(User)

Problem.hasMany(Test)
Test.belongsTo(Problem)

User.belongsToMany(Problem, {through: UserStats})
Problem.belongsToMany(User, {through: UserStats})

module.exports = {
  User,
  UserStats,
  Codewars,
  CodewarsLanguages,
  CodewarsQuestions,
  Hackernoon,
  Medium,
  Problem,
  GithubRepos,
  GithubCommits,
  Stackoverflow,
  StackoverflowBadges,
  StackoverflowTopTags,
  StackoverflowBadgeNetwork,
  StackoverflowPrivileges,
  StackoverflowDailyRepChange,
  Test
}
