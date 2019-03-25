const APIPicker = require('./APIPicker')

//just another layer on model commands
const APICommand = category => async (subcategory, command, payload) => {
  const {model} = APIPicker[category][subcategory]

  const result = await model[command]({where: payload})

  return result
}

module.exports = APICommand
