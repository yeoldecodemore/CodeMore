const User = require('./user')
const Codewars = require('./codewars')
const CodewarsLanguages = require('./codewarslanguages')
const CodewarsQuestions = require('./codewarsquestions')

Codewars.hasMany(CodewarsLanguages)
CodewarsLanguages.belongsTo(Codewars)
Codewars.hasMany(CodewarsQuestions)
CodewarsQuestions.belongsTo(Codewars)

User.hasOne(Codewars)
Codewars.belongsTo(User)

module.exports = {
  User,
  Codewars,
  CodewarsLanguages,
  CodewarsQuestions
}
