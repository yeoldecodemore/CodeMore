const _privilegeMapper = (items, stackoverflowmodelId) => [
  items.map(curr => ({
    stackoverflowmodelId,
    ...curr
  }))
]

module.exports = _privilegeMapper
