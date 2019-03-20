const Sequelize = require('sequelize')
const db = require('../db')

const StackoverflowDailyRepChange = db.define('stackoverflowdailyrepchange', {
  reputation_change: {
    type: Sequelize.INTEGER
  },
  reputation_type: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATE
  }
})

module.exports = StackoverflowDailyRepChange
