/* eslint-disable react/display-name */
import React from 'react'
import {FaImage, FaHands} from 'react-icons/fa'
import {IconContext} from 'react-icons'
export default () => (
  <div className="clapArticle">
    <div className="clapInner">
      <div className="clapHeader">
        {/* <img className="clapImage" src="/images/medium.png" /> */}
        <div className="clapTitle">{topClapArticle.title}</div>
      </div>
      <div className="clapInfo">
        <div>
          <IconContext.Provider value={{color: 'red', className: 'clapHands'}}>
            <FaHands />
          </IconContext.Provider>
          <div className="clapClaps">{topClapArticle.claps}</div>
        </div>
        <div>
          <IconContext.Provider value={{color: 'red', className: 'clapTopic'}}>
            <Topic />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  </div>
)
