const _dateWithoutTime = require('./dateWithoutTime')

const _stackoverflowConverter = (item, userId) => ({
  bronzeBadge: item.badge_counts.bronze,
  silverBadge: item.badge_counts.silver,
  goldBadge: item.badge_counts.gold,
  views: item.view_count,
  downvotes: item.down_vote_count,
  upvotes: item.up_vote_count,
  numAnswered: item.answer_count,
  numQuestion: item.question_count,
  stackoverflowId: item.user_id,
  reputation: item.reputation,
  reputation_change_year: item.reputation_change_year,
  userType: item.user_type,
  accept_rate: item.accept_rate,
  reputation_change_month: item.reputation_change_month,
  reputation_change_day: item.reputation_change_day,
  reputation_change_week: item.reputation_change_week,
  reputation_change_quarter: item.reputation_change_quarter,
  creationDate: _dateWithoutTime(item.creation_date * 1000),
  last_access_date: _dateWithoutTime(item.last_access_date * 1000),
  userId
})

module.exports = _stackoverflowConverter
