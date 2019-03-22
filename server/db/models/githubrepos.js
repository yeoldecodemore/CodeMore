const Sequelize = require('sequelize')
const db = require('../db')

const GithubRepos = db.define('githubrepos', {
  repo_created_at: {
    type: Sequelize.DATE
  },
  repo_updated_at: {
    type: Sequelize.DATE
  },
  stars: {
    type: Sequelize.INTEGER
  },
  forks: {
    type: Sequelize.INTEGER
  },
  watchers: {
    type: Sequelize.INTEGER
  },
  open_issues: {
    type: Sequelize.INTEGER
  },
  language: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  }
})

module.exports = GithubRepos
