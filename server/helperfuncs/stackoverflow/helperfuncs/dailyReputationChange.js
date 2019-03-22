const _dateWithoutTime = require('../../dateWithoutTime')

const dataParser = (data, id) =>
  data.reduce((accum, curr) => {
    if (
      !accum[
        `${_dateWithoutTime(curr.creation_date * 1000)}-${
          curr.reputation_history_type
        }`
      ]
    ) {
      accum[
        `${_dateWithoutTime(curr.creation_date * 1000)}-${
          curr.reputation_history_type
        }`
      ] = {
        reputation_change: 0,
        stackoverflowmodelId: id
      }
    }
    accum[
      `${_dateWithoutTime(curr.creation_date * 1000)}-${
        curr.reputation_history_type
      }`
    ].reputation_change +=
      curr.reputation_change
    return accum
  }, {})

const _dailyReputationChange = (data, id) => {
  const obj = dataParser(data, id)
  return Object.keys(obj).map(val => ({
    ...obj[val],
    date: val.slice(0, val.indexOf(')-') + 1),
    reputation_type: val.slice(val.indexOf(')-') + 2, val.length)
  }))
}

module.exports = _dailyReputationChange
