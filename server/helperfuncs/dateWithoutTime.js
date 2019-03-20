const _dateWithoutTime = date => new Date(new Date(date).setHours(0, 0, 0, 0))

module.exports = _dateWithoutTime
