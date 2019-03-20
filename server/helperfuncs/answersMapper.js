const _answersMapper = (answers, userId) =>
  answers.map(curr => ({
    is_accepted: curr.is_accepted,
    score: curr.score,
    creation_date: curr.creation_date,
    badge_name: curr.name,
    userId
  }))

module.exports = _answersMapper

// { owner:
//   { reputation: 180499,
//     user_id: 541136,
//     user_type: 'moderator',
//     accept_rate: 96,
//     profile_image: 'https://i.stack.imgur.com/wftMn.jpg?s=128&g=1',
//     display_name: 'Aaron Hall',
//     link: 'https://stackoverflow.com/users/541136/aaron-hall' },
//  is_accepted: false,
//  score: 88,
//  last_activity_date: 1552861424,
//  last_edit_date: 1552861424,
//  creation_date: 1433540476,
//  answer_id: 30676267,
//  question_id: 4352244 },
