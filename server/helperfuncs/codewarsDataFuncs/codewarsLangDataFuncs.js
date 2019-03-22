const {CodewarsLanguages} = require('../../db/models')
const {_codeWarsLanguageReducer} = require('../')
const _bulkUpdateorCreate = require('../generic')

const _getCodewarsLanguages = async (languages, id) => {
  const codewarsLanguages = await _bulkUpdateorCreate(
    languages,
    id,
    ['codewarId', 'languageName'],
    _codeWarsLanguageReducer,
    CodewarsLanguages
  )

  return codewarsLanguages
}

module.exports = _getCodewarsLanguages
