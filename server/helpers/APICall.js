const APIPicker = require('./APIPicker')

//payload are values that are necessary

//making APICall this way allows you to declare the category outright
const APICall = category => async (subcategory, payload) => {
  const {model, sqlFunc, api, dataComb, reducer, whereVals} = APIPicker[
    category
  ][subcategory]
  const pullData = await api(payload) //get api data
  const [data, extraData] = reducer(dataComb(pullData), payload) //apply reducer function
  //sometimes there is a need to send back data from this step and return it (hence extraData)
  const result = await sqlFunc(model, whereVals, data) //the respective Sequelize function (BUC or UC)
  return [result, extraData]
}

module.exports = APICall
