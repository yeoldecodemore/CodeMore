const Sequelize = require('sequelize')
const db = require('../db')

const Solutions = db.define('solutions', {
  solutionName: {
    type: Sequelize.STRING
  },
  solution: {
    type: Sequelize.STRING
  }
})

module.exports = Solutions
