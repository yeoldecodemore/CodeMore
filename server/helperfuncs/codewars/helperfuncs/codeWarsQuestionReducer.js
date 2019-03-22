const _dateWithoutTime = require('../../dateWithoutTime')
const _codeWarsQuestionReducer = (questions, codewarId) =>
  questions.map(curr => ({
    questionId: curr.id,
    questionName: curr.name,
    questionSlug: curr.slug,
    questionCompletedAt: _dateWithoutTime(curr.completedAt),
    questionLanguages: curr.completedLanguages,
    codewarId
  }))

module.exports = _codeWarsQuestionReducer
