const Sequelize = require('sequelize')
const db = require('../db')

const GithubCommits = db.define('githubcommits', {
  message: {
    type: Sequelize.TEXT
  },
  date: {
    type: Sequelize.DATE
  },
  repo: {
    type: Sequelize.STRING
  }
})

module.exports = GithubCommits
