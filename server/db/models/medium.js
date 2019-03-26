const Sequelize = require('sequelize')
const db = require('../db')

const Medium = db.define('mediummodel', {
  medium_id: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING
  },
  created: {
    type: Sequelize.DATE
  },
  updated: {
    type: Sequelize.DATE
  },
  link: {
    type: Sequelize.STRING
  },
  firstPublish: {
    type: Sequelize.DATE
  },
  latestPublish: {
    type: Sequelize.DATE
  },
  wordCount: {
    type: Sequelize.INTEGER
  },
  imageCount: {
    type: Sequelize.INTEGER
  },
  readingTime: {
    type: Sequelize.INTEGER
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  responses: {
    type: Sequelize.INTEGER
  },
  claps: {
    type: Sequelize.INTEGER
  },
  readingList: {
    type: Sequelize.INTEGER
  },
  topic: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Medium
