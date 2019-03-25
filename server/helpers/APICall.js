const APIPicker = require('./APIPicker')

const APICall = category => async (subcategory, payload) => {
  const {model, sqlFunc, api, dataComb, reducer, whereVals} = APIPicker[
    category
  ][subcategory]
  const pullData = await api(payload)
  const [data, extraData] = reducer(dataComb(pullData), payload)
  const result = await sqlFunc(model, whereVals, data)
  return [result, extraData]
}

module.exports = APICall
