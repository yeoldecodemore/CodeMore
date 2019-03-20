const Sequelize = require('sequelize')
const db = require('../db')

const StackoverflowBadgeNetwork = db.define('stackoverflowbadgenetwork', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  creationDate: {
    type: Sequelize.DATE
  }
})

module.exports = StackoverflowBadgeNetwork
