const Sequelize = require('sequelize')
const db = require('../db')

// {
//   "username": "derekharmanli",
//     "name": "Derek Harmanli",
//       "honor": 4,
//         "clan": null,
//           "leaderboardPosition": null,
//             "skills": null,
//               "ranks": {
//     "overall": {
//       "rank": -8,
//         "name": "8 kyu",
//           "color": "white",
//             "score": 2
//     },
//   !  "languages": {
//  !     "javascript": {
// !        "rank": -8,
//    !       "name": "8 kyu",
//     !        "color": "white",
//      !         "score": 2
//       }
//     }
//   },
// !  "codeChallenges": {
//  !   "totalAuthored": 0,
//    !   "totalCompleted": 1
//   }
// }
const Codewars = db.define('codewars', {
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  honor: {
    type: Sequelize.SMALLINT
  },
  leaderboardPosition: {
    type: Sequelize.SMALLINT
  },
  skills: {
    type: Sequelize.STRING
  },
  overallRank: {
    type: Sequelize.STRING
  },
  overallRankName: {
    type: Sequelize.STRING
  },
  overallRankColor: {
    type: Sequelize.STRING
  },
  overallRankScore: {
    type: Sequelize.SMALLINT
  }
})

module.exports = Codewars
