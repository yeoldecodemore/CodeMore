/* eslint-disable react/display-name */
import React from 'react'
import {mapIcon} from '../helperfuncs/'

export default ({topClapArticle, medium}) => {
  const Topic = mapIcon(topClapArticle.topic, 'medium')
  const Clap = mapIcon('clap')
  return (
    <a
      className="clapArticle"
      href={`https://www.medium.com/${medium}/${topClapArticle.medium_id}`}
    >
      <div className="clapInner">
        <div className="clapHeader">
          <div className="clapTitle">{topClapArticle.title}</div>
        </div>
        <div className="clapInfo">
          <div className="clapOne">
            <Clap />
            <div className="clapClaps">{topClapArticle.claps}</div>
          </div>
          <div className="clapTwo">
            <Topic />
          </div>
        </div>
      </div>
    </a>
  )
}
