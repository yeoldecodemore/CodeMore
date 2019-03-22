const _mapWhereValues = (val, whereValues) => ({
  where: whereValues.reduce((accum, curr) => {
    accum[curr] = val[curr]
    return accum
  }, {}),
  returning: true
})

const _handleEach = async (val, whereValues, model) => {
  const where = _mapWhereValues(val, whereValues)

  const result = await model.findOne(where)

  return result
    ? model.update(val, where)
    : model.create(val, {returning: true})
}

const _bulkUpdateorCreate = async (data, whereValues, model) => {
  const promiseArr = data.map(val => _handleEach(val, whereValues, model))

  const result = await Promise.all(promiseArr)

  return result
}

module.exports = _bulkUpdateorCreate
