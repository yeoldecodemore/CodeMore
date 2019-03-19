const Sequelize = require('sequelize')
const db = require('../db')

const Test = db.define('test', {
  testCaseNumber: {
    type: Sequelize.INTEGER
  },
  testTemplate: {
    type: Sequelize.STRING
  }
})

module.exports = Test
