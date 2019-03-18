const Sequelize = require('sequelize')
const db = require('../db')

const HackerNoon = db.define('hackernoon', {
  url: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  claps: {
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING
  },
  time: {
    type: Sequelize.DATE
  },
  responses: {
    type: Sequelize.INTEGER
  },
  readingTime: {
    type: Sequelize.INTEGER
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = HackerNoon
