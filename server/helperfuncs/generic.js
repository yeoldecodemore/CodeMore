const _mapWhereValues = (val, whereValues) =>
  whereValues.reduce((accum, curr) => {
    accum[curr] = val[curr]
    return accum
  }, {})

const _create = async (val, model) => {
  const result = await model.create(val)
  return result
}
const _update = async (val, model, obj) => {
  const result = await model.update(val, {where: obj})
  return result
}
const _handleEach = async (val, whereValues, model) => {
  const finalWhere = _mapWhereValues(val, whereValues)

  const result = await model.findOne({where: finalWhere})

  return result ? _update(val, model, finalWhere) : _create(val, model)
}

const _bulkUpdateorCreate = async (
  data,
  id,
  whereValues,
  _helperFunc,
  model
) => {
  const promiseArr = _helperFunc(data, id).map(val =>
    _handleEach(val, whereValues, model)
  )

  const result = await Promise.all(promiseArr)

  return result
}

module.exports = _bulkUpdateorCreate
