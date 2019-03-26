/* eslint-disable react/display-name */
import React from 'react'
import {
  totalClaps,
  topClap,
  lengthArr,
  createDate,
  mapIcon
} from '../helperfuncs/'
import VisualArticle from './VisualArticle'
export default ({hackernoonPosts, mediumPosts, medium}) => {
  const topClapArticle = topClap(mediumPosts.concat(hackernoonPosts)) || {}
  // const Clap = mapIcon('clap')
  const MediumLogo = mapIcon('medium')
  const HackernoonLogo = mapIcon('hackernoon')
  // const PaperEdit = mapIcon('paperedit')
  // const Calender = mapIcon('calendar')
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
              <th>{/* <MediumLogo /> */} hi</th>
              <th>
                <HackernoonLogo />
              </th>
            </tr>
            <tr>
              <td>{/* <PaperEdit /> */} hi</td>
              <td>{lengthArr(mediumPosts)}</td>
              <td>{lengthArr(hackernoonPosts)}</td>
            </tr>
            <tr>
              <td>{/* <Clap /> */} hi</td>
              <td>{totalClaps(mediumPosts)}</td>
              <td>{totalClaps(hackernoonPosts)}</td>
            </tr>
            <tr>
              <td>{/* <Calender /> */} hi</td>
              <td>{createDate(mediumPosts, 'created')}</td>
              <td>{createDate(hackernoonPosts, 'time')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
