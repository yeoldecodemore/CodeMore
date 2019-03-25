const _dateWithoutTime = require('../dateWithoutTime')

const _stackoverflowConverter = (
  {
    badge_counts: {bronze, silver, gold},
    view_count,
    down_vote_count,
    up_vote_count,
    answer_count,
    question_count,
    user_id,
    reputation,
    reputation_change_day,
    reputation_change_month,
    reputation_change_quarter,
    reputation_change_week,
    reputation_change_year,
    accept_rate,
    user_type,
    creation_date,
    last_access_date
  },
  userId
) => [
  {
    bronzeBadge: bronze,
    silverBadge: silver,
    goldBadge: gold,
    views: view_count,
    downvotes: down_vote_count,
    upvotes: up_vote_count,
    numAnswered: answer_count,
    numQuestion: question_count,
    stackoverflowId: user_id,
    reputation: reputation,
    userType: user_type,
    accept_rate: accept_rate,
    reputation_change_year: reputation_change_year,
    reputation_change_month: reputation_change_month,
    reputation_change_day: reputation_change_day,
    reputation_change_week: reputation_change_week,
    reputation_change_quarter: reputation_change_quarter,
    creationDate: _dateWithoutTime(creation_date * 1000),
    last_access_date: _dateWithoutTime(last_access_date * 1000),
    userId
  }
]

module.exports = _stackoverflowConverter
