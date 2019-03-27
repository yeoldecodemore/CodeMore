/* eslint-disable react/display-name */
import React from 'react'
import {
  topCodewarsLanguages,
  topCodewarsLanguagesViz,
  createDate,
  lastcodewarsQuestion,
  mapIcon
} from '../helperfuncs/'

export default ({codewarsLanguages, codewarsQuestions, generalCodewars}) => (
  <div className="codewarsContainer">
    <div className="codewarsTop">
      <div className="codewarsCol codewarsColSize">
        <div className="codewarsCol">
          <h4 className="profileTitle" id="smaller">
            Completed
          </h4>
          <div className="codewarssubtitle">
            {generalCodewars.totalCompleted}
          </div>
        </div>
        <div className="codewarsCol">
          <h4 className="profileTitle" id="smaller">
            Authored
          </h4>
          <div className="codewarssubtitle">
            {generalCodewars.totalAuthored}
          </div>
        </div>
      </div>
      <div className="codewarsCol codewarsColSize">
        <div className="codewarsCol">
          <img src="./images/codewars.png" className="codewarsLogo" />
        </div>
        <div className="codewarsCol">
          <h4 className="profileTitle" id="smaller">
            Most Recent Question
          </h4>
          <div className="codewarssubtitle">
            {createDate(codewarsQuestions, 'questionCompletedAt')}
          </div>
        </div>
      </div>
      <div className="codewarsCol codewarsColSize">
        <div className="codewarsCol">
          <h4 className="profileTitle" id="smaller">
            Leaderboard
          </h4>
          <div className="codewarssubtitle">
            {generalCodewars.leaderboardPosition}
          </div>
        </div>
        <div className="codewarsCol">
          <h4 className="profileTitle" id="smaller">
            Overall Rank
          </h4>
          <div className="codewarssubtitle">
            {generalCodewars.overallRankName}
          </div>
        </div>
      </div>
    </div>
    <div className="codewarsBottom">
      <div className="codewarslanguages">
        {topCodewarsLanguagesViz(codewarsLanguages, 5).map((Logo, i) => (
          <Logo key={i} />
        ))}
      </div>
    </div>
  </div>
)
