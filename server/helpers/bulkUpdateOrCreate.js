const updateOrCreate = require('./updateOrCreate')

const bulkUpdateOrCreate = (model, whereValues, data) =>
  Promise.all(data.map(val => updateOrCreate(model, whereValues, val)))

module.exports = bulkUpdateOrCreate
