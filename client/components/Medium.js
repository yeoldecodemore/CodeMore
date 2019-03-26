/* eslint-disable react/display-name */
import React from 'react'
import {totalClaps, topClap, lengthArr, createDate} from '../helperfuncs/'
import VisualArticle from './VisualArticle'
import {FaImage, FaHands, FaRegEdit, FaCalendarAlt} from 'react-icons/fa'
import {IconContext} from 'react-icons'
import {sortByVal} from '../helperfuncs/sortByVal'
export default ({hackernoonPosts, mediumPosts, medium}) => {
  const topClapArticle = topClap(mediumPosts.concat(hackernoonPosts)) || {}
  console.log(mediumPosts)
  // console.log(sortByVal(mediumPosts, 'created').reverse()[0].created)
  return (
    <div className="medium">
      <div className="mediumLeft">
        <h4 className="profileTitle">Most Clapped Article</h4>
        <VisualArticle topClapArticle={topClapArticle} medium={medium} />
      </div>
      <div className="mediumRight">
        <h4 className="profileTitle">Statistics</h4>
        <table className="mediumTable">
          <tbody>
            <tr>
              <th />
              <th>
                <img className="tableImage" src="/images/mediumInverted.png" />
              </th>
              <th>
                <img className="tableImage" src="/images/hackernoon.png" />
              </th>
            </tr>
            <tr>
              <td>
                <IconContext.Provider
                  value={{color: '#800080', className: 'clapHands'}}
                >
                  <FaRegEdit />
                </IconContext.Provider>
              </td>
              <td>{lengthArr(mediumPosts)}</td>
              <td>{lengthArr(hackernoonPosts)}</td>
            </tr>
            <tr>
              <td>
                <IconContext.Provider
                  value={{color: '#800080', className: 'clapHands'}}
                >
                  <FaHands />
                </IconContext.Provider>
              </td>
              <td>{totalClaps(mediumPosts)}</td>
              <td>{totalClaps(hackernoonPosts)}</td>
            </tr>
            <tr>
              <td>
                <IconContext.Provider
                  value={{color: '#800080', className: 'clapHands'}}
                >
                  <FaCalendarAlt />
                </IconContext.Provider>
              </td>
              <td>{createDate(mediumPosts, 'created')}</td>
              <td>{createDate(hackernoonPosts, 'time')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
