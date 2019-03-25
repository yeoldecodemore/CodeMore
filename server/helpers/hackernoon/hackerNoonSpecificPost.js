const rp = require('request-promise')
const $ = require('cheerio')

const hackernoonSpecificPost = function(
  url,
  claps,
  time,
  responses,
  readingTime,
  title
) {
  return rp(url)
    .then(function(html) {
      //tags
      let tags = []
      $('ul.tags li', html).each(function() {
        tags.push($(this).text())
      })
      return {
        url,
        claps,
        time,
        responses,
        readingTime,
        title,
        tags
      }
    })
    .catch(function(err) {
      console.log(err)
    })
}
//
module.exports = hackernoonSpecificPost
