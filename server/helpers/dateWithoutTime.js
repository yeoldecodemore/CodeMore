const _dateWithoutTime = date =>
  new Date(new Date(date).setUTCHours(0, 0, 0, 0)).toUTCString()

module.exports = _dateWithoutTime
