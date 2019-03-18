const Sequelize = require('sequelize')
const db = require('../db')

const CodewarsQuestions = db.define('codewarsquestions', {
  questionId: {
    type: Sequelize.STRING
  },
  questionName: {
    type: Sequelize.STRING
  },
  questionSlug: {
    type: Sequelize.STRING
  },
  questionCompletedAt: {
    type: Sequelize.DATE
  },
  questionLanguages: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = CodewarsQuestions
