const Sequelize = require('sequelize')
const db = require('../db')

const StackoverflowPrivileges = db.define('stackoverflowprivileges', {
  reputation: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.STRING
  },
  short_description: {
    type: Sequelize.STRING
  }
})

module.exports = StackoverflowPrivileges
