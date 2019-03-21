const axios = require('axios')
const {CodewarsQuestions} = require('../../db/models')
const {_codeWarsQuestionsReducer} = require('../')
const _bulkUpdateorCreate = require('../generic')

const _callCodewarsQuestionAPI = async username => {
  const {data: {data}} = await axios.get(
    `https://www.codewars.com/api/v1/users/${username}/code-challenges/completed?page=0`
  )
  return data
}

const _getCodewarsQuestions = async (username, id) => {
  const data = await _callCodewarsQuestionAPI(username)

  const codewarsQuestions = await _bulkUpdateorCreate(
    data,
    id,
    ['codewarId', 'questionId'],
    _codeWarsQuestionsReducer,
    CodewarsQuestions
  )
  return codewarsQuestions
}

module.exports = _getCodewarsQuestions
