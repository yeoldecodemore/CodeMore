const Sequelize = require('sequelize')
const db = require('../db')

const StackoverflowTopTags = db.define('stackoverflowtoptags', {
  answered: {
    type: Sequelize.INTEGER
  },
  answerScore: {
    type: Sequelize.INTEGER
  },
  questions: {
    type: Sequelize.INTEGER
  },
  questionScore: {
    type: Sequelize.INTEGER
  },
  tagName: {
    type: Sequelize.STRING
  }
})

module.exports = StackoverflowTopTags
