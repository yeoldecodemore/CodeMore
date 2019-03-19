const User = require('./user')
const Problem = require('./problem')
const Test = require('./test')
const Codewars = require('./codewars')
const CodewarsLanguages = require('./codewarslanguages')
const CodewarsQuestions = require('./codewarsquestions')
const HackerNoon = require('./hackernoon')

Codewars.hasMany(CodewarsLanguages)
CodewarsLanguages.belongsTo(Codewars)
Codewars.hasMany(CodewarsQuestions)
CodewarsQuestions.belongsTo(Codewars)

User.hasOne(Codewars)
Codewars.belongsTo(User)

User.hasOne(HackerNoon)
HackerNoon.belongsTo(User)

Problem.hasMany(Test)
Test.belongsTo(Problem)

module.exports = {
  User,
  Codewars,
  CodewarsLanguages,
  CodewarsQuestions,
  HackerNoon,
  Problem,
  Test
}
