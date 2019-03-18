const User = require('./user')
const Problem = require('./problems')
const Solutions = require('./solutions')
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

module.exports = {
  User,
  Codewars,
  CodewarsLanguages,
  CodewarsQuestions,
  HackerNoon,
  Problem,
  Solutions
}
