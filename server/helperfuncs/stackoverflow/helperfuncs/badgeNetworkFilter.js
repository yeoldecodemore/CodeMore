const _dateWithoutTime = require('../../dateWithoutTime')
const _badgeNetworkFilter = (data, id) =>
  data
    .filter(val => val.activity_type.includes('badge_earned'))
    // .filter(val => val.api_site_parameter.includes('stackoverflow'))
    .map(val => ({
      stackoverflowmodelId: id,
      creationDate: _dateWithoutTime(val.creation_date * 1000),
      description: val.description,
      title: val.title
    }))

module.exports = _badgeNetworkFilter
