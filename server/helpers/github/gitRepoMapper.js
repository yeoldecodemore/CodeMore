const _gitRepoMapper = (items, userId) =>
  new Array(2).fill(
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
  )

// in order to satisfy the "extradata", we want to send down the exact same data as gitArr
module.exports = _gitRepoMapper
