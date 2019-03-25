const _dateWithoutTime = require('../dateWithoutTime')

const _mediumReducer = (response, userId) => [
  response.map(curr => ({
    medium_id: curr.id,
    title: curr.title,
    created: _dateWithoutTime(curr.createdAt),
    updated: _dateWithoutTime(curr.updatedAt),
    firstPublish: _dateWithoutTime(curr.firstPublishedAt),
    latestPublish: _dateWithoutTime(curr.latestPublishedAt),
    wordCount: curr.virtuals.wordCount,
    imageCount: curr.virtuals.imageCount,
    readingTime: curr.virtuals.readingTime,
    tags: curr.virtuals.tags.map(val => val.name),
    socialRecommends: curr.virtuals.socialRecommendsCount,
    responses: curr.virtuals.responsesCreatedCount,
    claps: curr.virtuals.totalClapCount,
    readingList: curr.virtuals.readingList,
    topic: curr.virtuals.topics.map(val => val.name),
    userId
  }))
]

module.exports = _mediumReducer
