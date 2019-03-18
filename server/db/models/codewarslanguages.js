const Sequelize = require('sequelize')
const db = require('../db')

const CodewarsLanguages = db.define('codewarslanguages', {
  languageName: {
    type: Sequelize.STRING
  },
  languageRank: {
    type: Sequelize.INTEGER
  },
  languageRankName: {
    type: Sequelize.STRING
  },
  languageRankColor: {
    type: Sequelize.STRING
  },
  languageRankScore: {
    type: Sequelize.INTEGER
  }
})

module.exports = CodewarsLanguages
