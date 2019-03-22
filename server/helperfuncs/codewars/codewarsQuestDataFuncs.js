const axios = require('axios')
const {CodewarsQuestions} = require('../../db/models')
const {_codeWarsQuestionReducer} = require('./helperfuncs/')
const _bulkUpdateorCreate = require('../bulkUpdateorCreate')

const _callCodewarsQuestionAPI = async username => {
  const {data: {data}} = await axios.get(
    `https://www.codewars.com/api/v1/users/${username}/code-challenges/completed?page=0`
  )
  return data
}

const _getCodewarsQuestions = async (username, id) => {
  const data = await _callCodewarsQuestionAPI(username)

  const codewarsQuestions = await _bulkUpdateorCreate(
    _codeWarsQuestionReducer(data, id),
    ['codewarId', 'questionId'],
    CodewarsQuestions
  )
  return codewarsQuestions
}

module.exports = _getCodewarsQuestions
