/* eslint-disable react/display-name */
import React from 'react'
import {mapIcon} from '../helperfuncs/'
import {FaImage, FaHands} from 'react-icons/fa'
import {IconContext} from 'react-icons'

export default ({topClapArticle, medium}) => {
  const Topic = topClapArticle.topic ? mapIcon(topClapArticle.topic) : FaImage
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
            <IconContext.Provider
              value={{color: '#800080', className: 'clapHands'}}
            >
              <FaHands />
            </IconContext.Provider>
            <div className="clapClaps">{topClapArticle.claps}</div>
          </div>
          <div className="clapTwo">
            {Topic ? (
              <Topic />
            ) : (
              <img className="logo" src="/images/medium.png" />
            )}
          </div>
        </div>
      </div>
    </a>
  )
}
