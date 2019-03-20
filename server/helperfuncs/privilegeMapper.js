const _privilegeMapper = (items, id) =>
  items.map(curr => ({
    stackoverflowmodelId: id,
    ...curr
  }))

module.exports = _privilegeMapper
