const Sequelize = require('sequelize')
const db = require('../db')

const Codewars = db.define('codewars', {
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  // firstName: {
  //   type: Sequelize.STRING
  // },
  // lastName: {
  //   type: Sequelize.STRING
  // },
  honor: {
    type: Sequelize.INTEGER
  },
  clan: {
    type: Sequelize.STRING
  },
  leaderboardPosition: {
    type: Sequelize.INTEGER
  },
  skills: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  overallRank: {
    type: Sequelize.STRING
  },
  overallRankName: {
    type: Sequelize.STRING
  },
  overallRankColor: {
    type: Sequelize.STRING
  },
  overallRankScore: {
    type: Sequelize.INTEGER
  },
  totalAuthored: {
    type: Sequelize.INTEGER
  },
  totalCompleted: {
    type: Sequelize.INTEGER
  }
})

module.exports = Codewars
