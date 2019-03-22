const _badgeMapper = (items, id) =>
  items.map(curr => ({
    stackoverflowmodelId: id,
    badge_type: curr.badge_type,
    award_count: curr.award_count,
    rank: curr.rank,
    badge_name: curr.name
  }))

module.exports = _badgeMapper
