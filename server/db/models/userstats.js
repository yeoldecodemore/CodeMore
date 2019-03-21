const Sequelize = require('sequelize')
const db = require('../db')

const UserStats = db.define('userstats', {
  status: {
    type: Sequelize.ENUM('notstarted', 'started', 'failedtests', 'passedtests'),
    defaultValue: 'notstarted'
  },
  timeToSolve: {
    type: Sequelize.TIME
  },
  lines: {
    type: Sequelize.SMALLINT,
    defaultValue: 0
  },
  timesTested: {
    type: Sequelize.SMALLINT,
    defaultValue: 0
  }
})

module.exports = UserStats
