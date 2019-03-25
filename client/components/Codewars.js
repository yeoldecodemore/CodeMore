/* eslint-disable react/display-name */
import React from 'react'
import {codewarsLanguagesViz} from '../helperfuncs/'
export default ({codewarsLanguages, codewarsQuestions, generalCodewars}) => (
  <div>
    <div className="codewars">
      <img className="codewarsImage" src="/images/Codewars.png" />

      <div className="codewarsInfo">
        <div>
          <h4>{`Current Rank: ${generalCodewars.overallRankName}`}</h4>
        </div>
        <div className="languages">
          <h4>{`Codewar Languages: ${codewarsLanguagesViz(
            codewarsLanguages
          ).join(' | ')}`}</h4>
        </div>
        <div className="languages" />
        <div className="languages">
          <h4>{`Completed: ${generalCodewars.totalCompleted} Authored: ${
            generalCodewars.totalAuthored
          }`}</h4>
        </div>
      </div>
    </div>
  </div>
)
