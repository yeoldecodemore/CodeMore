const _topTagFilter = (data, stackoverflowmodelId) => [
  data.filter(val => val.answer_count > 1).map(val => ({
    stackoverflowmodelId,
    answered: val.answer_count,
    answerScore: val.answer_score,
    questions: val.question_count,
    questionScore: val.question_score,
    tagName: val.tag_name
  }))
]

module.exports = _topTagFilter
