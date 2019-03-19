const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  githubId: {
    type: Sequelize.INTEGER,
    unique: true
  },
  profileUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  site_admin: {
    type: Sequelize.STRING
  },
  public_repos: {
    type: Sequelize.INTEGER
  },
  public_gists: {
    type: Sequelize.INTEGER
  },
  followers: {
    type: Sequelize.INTEGER
  },
  following: {
    type: Sequelize.INTEGER
  },
  git_created_at: {
    type: Sequelize.DATE
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  codewars: {
    type: Sequelize.STRING
  },
  hackernoon: {
    type: Sequelize.STRING
  },
  medium: {
    type: Sequelize.STRING
  },
  stackoverflow: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }
})

module.exports = User
