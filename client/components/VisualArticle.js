/* eslint-disable react/display-name */
import React from 'react'
import {mapIcon} from '../helperfuncs/'

export default ({topClapArticle, link, label}) => {
  const Topic = mapIcon(topClapArticle.topic, label)
  const Clap = mapIcon('clap')
  return (
    <a className="clapArticle" href={link} target="_blank">
      <div className="clapInner">
        <div className="clapHeader">
          <div className="clapTitle">{topClapArticle.title}</div>
        </div>
        <div className="clapInfo">
          <div>
            <Clap className="languageIcon" />
            <div className="clapClaps">{topClapArticle.claps}</div>
          </div>
          <div className="clapTwo">
            <Topic className="languageIcon" />
          </div>
        </div>
      </div>
    </a>
  )
}
