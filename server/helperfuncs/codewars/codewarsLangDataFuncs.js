const {CodewarsLanguages} = require('../../db/models')
const {_codeWarsLanguageReducer} = require('./helperfuncs/')
const _bulkUpdateorCreate = require('../bulkUpdateorCreate')

const _getCodewarsLanguages = async (languages, id) => {
  const codewarsLanguages = await _bulkUpdateorCreate(
    _codeWarsLanguageReducer(languages, id),
    ['codewarId', 'languageName'],
    CodewarsLanguages
  )

  return codewarsLanguages
}

module.exports = _getCodewarsLanguages
