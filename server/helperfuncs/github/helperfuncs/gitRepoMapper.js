const _gitRepoMapper = (items, userId) =>
  items.map(curr => ({
    repo_created_at: curr.created_at,
    repo_updated_at: curr.updated_at,
    stars: curr.stargazers_count,
    watchers: curr.watchers,
    forks: curr.forks,
    name: curr.full_name,
    language: curr.language,
    open_issues: curr.open_issues,
    userId
  }))

module.exports = _gitRepoMapper
