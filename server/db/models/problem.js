const Sequelize = require('sequelize')
const db = require('../db')

const Problem = db.define('problem', {
  problemName: {
    type: Sequelize.STRING
  },
  problemSlug: {
    type: Sequelize.STRING
  },
  problemDescription: {
    type: Sequelize.TEXT
  },
  problemExample: {
    type: Sequelize.TEXT
  },
  problemTemplate: {
    type: Sequelize.STRING
  },
  expectedResult: {
    type: Sequelize.STRING
  },
  solved: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Problem
