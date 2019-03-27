/* eslint-disable react/display-name */
import React from 'react'
import {
  topStackBadges,
  mapIcon,
  sanitizeDate,
  topStackAnswerTag
} from '../helperfuncs'
export default ({
  generalStack,
  stackBadges,
  stackTopTags,
  stackBadgeNetwork,
  stackPrivileges,
  stackDailyRep
}) => {
  const Stackoverflow = mapIcon('stackoverflow')
  const Gold = mapIcon('gold')
  const Silver = mapIcon('silver')
  const Bronze = mapIcon('bronze')
  const Question = mapIcon('question')
  const Answer = mapIcon('answer')
  const NetVote = mapIcon('netvote')
  const Day = mapIcon('day')
  const Week = mapIcon('week')
  const Month = mapIcon('month')

  return (
    <div className="stackoverflow">
      <div className="stackoverflowCol">
        <div className="stackBadges">
          <h4 className="profileTitle" id="smaller">
            Top Badges
          </h4>
          <ul>
            {topStackBadges(stackBadges, 3).map((val, i) => (
              <li key={i}>{`${val.badge_name}: ${val.award_count}`}</li>
            ))}
          </ul>
        </div>
        <div className="stackRepChange">
          <div className="stackStats">
            <div>
              <h4 className="profileTitle" id="smaller">
                Badge Breakdown
              </h4>
              <div className="statBadges">
                <div className="medal">
                  <Gold className="medalIcon" />
                  <div>{generalStack.goldBadge}</div>
                </div>
                <div className="medal">
                  <Silver className="medalIcon" />
                  <div>{generalStack.silverBadge}</div>
                </div>
                <div className="medal">
                  <Bronze className="medalIcon" />
                  <div>{generalStack.bronzeBadge}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="stackoverflowCol">
        <div className="stackGeneral" id="stackCol2">
          <div className="stackStats">
            <div>
              <h4 className="profileTitle" id="smaller">
                Post Data
              </h4>
              <div className="statData">
                <div className="medal">
                  <Question className="medalIcon" />
                  <div>{generalStack.numQuestion}</div>
                </div>
                <div className="medal">
                  <Answer className="medalIcon" />
                  <div>{generalStack.numAnswered}</div>
                </div>
                <div className="medal">
                  <NetVote className="medalIcon" />
                  <div>{generalStack.upvotes - generalStack.downvotes}</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="profileTitle" id="smaller">
                Total Reputation
              </h4>
              <div>{generalStack.reputation}</div>
            </div>
            <div>
              <h4 className="profileTitle" id="smaller">
                Reputation Breakdown
              </h4>
              <div className="statBadges">
                <div className="medal">
                  <Day className="medalIcon" />
                  <div>{generalStack.reputation_change_day}</div>
                </div>
                <div className="medal">
                  <Week className="medalIcon" />
                  <div>{generalStack.reputation_change_week}</div>
                </div>
                <div className="medal">
                  <Month className="medalIcon" />
                  <div>{generalStack.reputation_change_month}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="stackImage">
          <Stackoverflow className="stackLogo" />
          <div>{`Last login: ${sanitizeDate(
            new Date(generalStack.last_access_date)
          )}`}</div>
          <div>{`Member since: ${sanitizeDate(
            new Date(generalStack.creationDate)
          )}`}</div>
        </div>
      </div>
      <div className="stackoverflowCol">
        <div className="stackTags">
          <h4 className="profileTitle">Top Tags / Scores</h4>
          <div>
            <h4 className="profileTitle" id="smaller">
              Question
            </h4>
            <ul>
              {topStackAnswerTag(stackTopTags, 'questionScore', 2).map(
                (val, i) => (
                  <li key={i}>{`${val.tagName}: ${val.questionScore}`}</li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4 className="profileTitle" id="smaller">
              Answer
            </h4>
            <ul>
              {topStackAnswerTag(stackTopTags, 'answerScore', 2).map(
                (val, i) => (
                  <li key={i}>{`${val.tagName}: ${val.answerScore}`}</li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
