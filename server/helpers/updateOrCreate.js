const _mapWhereValues = (val, whereValues) => ({
  where: whereValues.reduce((accum, curr) => {
    accum[curr] = val[curr]
    return accum
  }, {}),
  returning: true
})

const _create = async (model, data) => {
  const result = await model.create(data, {returning: true})
  return result
}

const _update = async (model, where, data) => {
  //update comesback weird
  const [numRows, [result]] = await model.update(data, where)

  return result
}
const updateOrCreate = async (model, whereValues, data) => {
  //this is where we create the "where" for finding and for updating
  const where = _mapWhereValues(data, whereValues)

  const result = await model.findOne(where)

  return result ? _update(model, where, data) : _create(model, data)
}

module.exports = updateOrCreate
