const Sequelize = require('sequelize')
const db = require('../db')

const StackoverflowBadges = db.define('stackoverflowbadges', {
  badge_type: {
    type: Sequelize.STRING
  },
  award_count: {
    type: Sequelize.INTEGER
  },
  rank: {
    type: Sequelize.STRING
  },
  badge_name: {
    type: Sequelize.STRING
  }
})

module.exports = StackoverflowBadges
