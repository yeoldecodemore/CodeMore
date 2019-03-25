const _badgeMapper = (items, stackoverflowmodelId) => [
  items.map(curr => ({
    stackoverflowmodelId,
    badge_type: curr.badge_type,
    award_count: curr.award_count,
    rank: curr.rank,
    badge_name: curr.name
  }))
]

module.exports = _badgeMapper
