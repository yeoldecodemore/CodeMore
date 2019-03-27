/* eslint-disable react/display-name */
import React from 'react'
import {
  totalClaps,
  overallTopClaps,
  lengthArr,
  createDate,
  mapIcon
} from '../helperfuncs/'
import VisualArticle from './VisualArticle'
export default ({hackernoonPosts, mediumPosts, medium}) => {
  const [label, topClapArticle] = overallTopClaps(
    {label1: 'medium', arr1: mediumPosts},
    {label2: 'hackernoon', arr2: hackernoonPosts}
  )

  const Clap = mapIcon('clap')
  const MediumLogo = mapIcon('medium')
  const HackernoonLogo = mapIcon('hackernoon')
  const PaperEdit = mapIcon('paperedit')
  const Calendar = mapIcon('calendar')
  return (
    <div className="medium">
      <div className="mediumLeft">
        <h4 className="profileTitle">Most Clapped Article</h4>
        <VisualArticle
          topClapArticle={topClapArticle}
          link={
            label === 'medium'
              ? `https://www.medium.com/${medium}/${topClapArticle.medium_id}`
              : topClapArticle.url
          }
          label={label}
        />
      </div>
      <div className="mediumRight">
        <h4 className="profileTitle">Statistics</h4>
        <div className="mediumTableDiv">
          <table>
            <tbody>
              <tr>
                <th />
                <th>
                  <MediumLogo className="headerLogo" />
                </th>
                <th>
                  <HackernoonLogo className="headerLogo" />
                </th>
              </tr>
              <tr>
                <td>
                  <PaperEdit className="paperLogo" />
                </td>
                <td>{lengthArr(mediumPosts)}</td>
                <td>{lengthArr(hackernoonPosts)}</td>
              </tr>
              <tr>
                <td>
                  <Clap className="clapLogo" />
                </td>
                <td>{totalClaps(mediumPosts)}</td>
                <td>{totalClaps(hackernoonPosts)}</td>
              </tr>
              <tr>
                <td>
                  <Calendar className="calendarLogo" />
                </td>
                <td>{createDate(mediumPosts, 'created')}</td>
                <td>{createDate(hackernoonPosts, 'time')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
