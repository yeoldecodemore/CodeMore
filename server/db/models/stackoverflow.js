const Sequelize = require('sequelize')
const db = require('../db')

const Stackoverflow = db.define('stackoverflowmodel', {
  stackoverflowId: {
    type: Sequelize.INTEGER,
    unique: true
  },
  bronzeBadge: {
    type: Sequelize.INTEGER
  },
  silverBadge: {
    type: Sequelize.INTEGER
  },
  goldBadge: {
    type: Sequelize.INTEGER
  },
  views: {
    type: Sequelize.INTEGER
  },
  downvotes: {
    type: Sequelize.INTEGER
  },
  upvotes: {
    type: Sequelize.INTEGER
  },
  numAnswered: {
    type: Sequelize.INTEGER
  },
  numQuestion: {
    type: Sequelize.INTEGER
  },
  userType: {
    type: Sequelize.STRING
  },
  accept_rate: {
    type: Sequelize.INTEGER
  },
  reputation: {
    type: Sequelize.INTEGER
  },
  reputation_change_day: {
    type: Sequelize.INTEGER
  },
  reputation_change_month: {
    type: Sequelize.INTEGER
  },
  reputation_change_week: {
    type: Sequelize.INTEGER
  },
  reputation_change_quarter: {
    type: Sequelize.INTEGER
  },
  reputation_change_year: {
    type: Sequelize.INTEGER
  },
  creationDate: {
    type: Sequelize.DATE
  },
  last_access_date: {
    type: Sequelize.DATE
  }
})

module.exports = Stackoverflow
