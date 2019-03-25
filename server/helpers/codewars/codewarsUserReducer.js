const _codewarsUserReducer = (
  {
    username,
    honor,
    clan,
    leaderboardPosition,
    skills,
    ranks: {overall: {rank, name, color, score}, languages},
    codeChallenges: {totalAuthored, totalCompleted}
  },
  userId
) => [
  {
    username,
    honor,
    clan,
    leaderboardPosition,
    skills,
    overallRank: rank,
    overallRankName: name,
    overallRankColor: color,
    overallRankScore: score,
    totalAuthored,
    totalCompleted,
    userId
  },
  languages
]

module.exports = _codewarsUserReducer
