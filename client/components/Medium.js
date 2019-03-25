/* eslint-disable react/display-name */
import React from 'react'
import {totalClaps, topClap, mapIcon} from '../helperfuncs/'
import {FaImage, FaHands} from 'react-icons/fa'
import {IconContext} from 'react-icons'
export default ({hackernoonPosts, mediumPosts}) => {
  const topClapArticle = topClap(mediumPosts) || {}
  const Topic = topClapArticle.topic ? mapIcon(topClapArticle.topic) : FaImage
  return (
    <div className="medium">
      <div>
        <h4>Most Recent Article Title: </h4>
        <h4>
          {`Claps: ${totalClaps(mediumPosts)} ${totalClaps(hackernoonPosts)}`}
        </h4>
      </div>
    </div>
  )
}
