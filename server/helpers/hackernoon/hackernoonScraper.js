/* eslint-disable guard-for-in */
/* eslint-disable no-loop-func */
const rp = require('request-promise')
const $ = require('cheerio')
const hackernoonSpecificPost = require('./hackernoon-SpecificPost')

const _getHackernoonData = username => {
  return rp(`https://hackernoon.com/${username}`)
    .then(function(html) {
      const claps = []
      const times = []
      const responses = []
      const readingTime = []
      const links = []
      const titles = []

      //article claps
      $('span.u-background > .button', html).each(function() {
        let length = $(this).text().length
        if (
          $(this)
            .text()
            .indexOf('K') > 0
        ) {
          claps.push(
            +$(this)
              .text()
              .slice(0, length - 1) * 1000
          )
        } else {
          claps.push(+$(this).text())
        }
      })
      $('.postArticle-readMore > a', html).each(function() {
        let questIdx = $(this)
          .attr('href')
          .split('')
          .indexOf('?')
        links.push(
          $(this)
            .attr('href')
            .slice(0, questIdx)
        )
      })
      //article times
      $('.postArticle time', html).each(function() {
        times.push($(this).attr('datetime'))
      })
      //article titles
      $('.sectionLayout--insetColumn > h3', html).each(function() {
        titles.push($(this).text())
      })

      //responses
      $('.buttonSet a.button--chromeless', html).each(function() {
        if (
          $(this)
            .text()
            .includes('responses')
        ) {
          let spaceIdx = $(this)
            .text()
            .indexOf(' ')
          responses.push(
            +$(this)
              .text()
              .slice(0, spaceIdx)
          )
        }
      })
      //article length
      $('.postArticle .readingTime', html).each(function() {
        let spaceIdx = $(this)
          .attr('title')
          .indexOf(' ')
        //console.log($(this).text())
        readingTime.push(
          +$(this)
            .attr('title')
            .slice(0, spaceIdx)
        )
      })
      return Promise.all(
        links.map(function(url, index) {
          return hackernoonSpecificPost(
            url,
            claps[index],
            times[index],
            responses[index],
            readingTime[index],
            titles[index]
          )
        })
      )
    })
    .then(function(obj) {
      return obj
    })
    .catch(function(err) {
      console.log(err)
    })
}

module.exports = _getHackernoonData
