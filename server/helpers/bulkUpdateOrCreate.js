const updateOrCreate = require('./updateOrCreate')

const bulkUpdateOrCreate = async (model, whereValues, data) => {
  //this creates an array of promises (Either update or create)
  const promiseArr = data.map(val => updateOrCreate(model, whereValues, val))

  const result = await Promise.all(promiseArr)

  return result
}

module.exports = bulkUpdateOrCreate
