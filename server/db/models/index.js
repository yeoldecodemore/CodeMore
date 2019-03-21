const User = require('./user')
const UserStats = require('./userstats')
const Problem = require('./problem')
const Test = require('./test')
const Codewars = require('./codewars')
const CodewarsLanguages = require('./codewarslanguages')
const CodewarsQuestions = require('./codewarsquestions')
const HackerNoon = require('./hackernoon')
const Medium = require('./medium')
const Stackoverflow = require('./stackoverflow')
const StackoverflowBadges = require('./stackoverflowbadges')
const StackoverflowTopTags = require('./stackoverflowtoptags')
const StackoverflowBadgeNetwork = require('./stackoverflowbadgenetwork')
const StackoverflowPrivileges = require('./stackoverflowprivileges')
const StackoverflowDailyRepChange = require('./stackoverflowdailyrep')

User.hasOne(Codewars)
Codewars.belongsTo(User)
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

User.hasOne(HackerNoon)
HackerNoon.belongsTo(User)

User.hasOne(Medium)
Medium.belongsTo(User)
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
  HackerNoon,
  Medium,
  Problem,
  Stackoverflow,
  StackoverflowBadges,
  StackoverflowTopTags,
  StackoverflowBadgeNetwork,
  StackoverflowPrivileges,
  StackoverflowDailyRepChange,
  Test
}
