/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Codewars from './Codewars'
import Medium from './Medium'
import {Github} from './Github'
import StackOverflow from './StackOverFlow'
import {
  findCodewars,
  findMedium,
  findHackernoon,
  findStackoverflow,
  findGithub
} from '../store/'
import {ProfilePhoto} from './ProfilePhoto'

const mapStateToProps = ({
  userReducer,
  codewarsReducer,
  mediumReducer,
  hackernoonReducer,
  githubReducer,
  stackoverflowReducer
}) => ({
  userId: userReducer.id,
  codewars: userReducer.codewars, //username in usermodel
  codewarsLanguages: codewarsReducer.codewarsLanguages,
  codewarsQuestions: codewarsReducer.codewarsQuestions,
  generalCodewars: codewarsReducer.generalCodewars,
  medium: userReducer.medium, //username in usermodel
  mediumPosts: mediumReducer.mediumPosts,
  hackernoon: userReducer.hackernoon, //username in usermodel
  hackernoonPosts: hackernoonReducer.hackernoonPosts,
  github: userReducer.username, //username in usermodel
  githubData: githubReducer,
  stackoverflow: userReducer.stackoverflow, //username in usermodel
  generalStack: stackoverflowReducer.generalStack,
  stackBadges: stackoverflowReducer.stackBadges,
  stackTopTags: stackoverflowReducer.stackTopTags,
  stackBadgeNetwork: stackoverflowReducer.stackBadgeNetwork,
  stackPrivileges: stackoverflowReducer.stackPrivileges,
  stackDailyRep: stackoverflowReducer.stackDailyRep
})

const mapDispatchToProps = dispatch => ({
  findCodewars: userId => dispatch(findCodewars(userId)),
  findMedium: userId => dispatch(findMedium(userId)),
  findHackernoon: userId => dispatch(findHackernoon(userId)),
  findGithub: userId => dispatch(findGithub(userId)),
  findStackoverflow: userId => dispatch(findStackoverflow(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  class Profile extends Component {
    componentDidMount() {
      if (this.props.codewars) this.props.findCodewars(this.props.userId)
      if (this.props.medium) this.props.findMedium(this.props.userId)
      if (this.props.hackernoon) this.props.findHackernoon(this.props.userId)
      if (this.props.github) this.props.findGithub(this.props.userId)
      if (this.props.stackoverflow)
        this.props.findStackoverflow(this.props.userId)
    }
    render() {
      const {
        codewarsLanguages,
        codewarsQuestions,
        generalCodewars,
        medium,
        codewars,
        mediumPosts,
        hackernoonPosts,
        githubData,
        generalStack,
        stackBadges,
        stackTopTags,
        stackBadgeNetwork,
        stackPrivileges,
        stackDailyRep,
        github
      } = this.props
      console.log(github)
      return (
        <div className="profile">
          <ProfilePhoto />
          <div className="stats">
            <div className="dataOne">
              <Codewars
                codewarsLanguages={
                  codewarsLanguages.length ? codewarsLanguages : []
                }
                codewarsQuestions={
                  codewarsQuestions.length ? codewarsQuestions : []
                }
                generalCodewars={
                  Object.keys(generalCodewars).length ? generalCodewars : {}
                }
                codewars={codewars}
              />
              <Github githubData={githubData} userName={github} />
            </div>
            <div className="dataTwo">
              <Medium
                mediumPosts={mediumPosts.length ? mediumPosts : [{claps: 0}]}
                hackernoonPosts={
                  hackernoonPosts.length ? hackernoonPosts : [{claps: 0}]
                }
                medium={medium}
              />
              <StackOverflow
                generalStack={
                  Object.keys(generalStack).length ? generalStack : {}
                }
                stackBadges={stackBadges.length ? stackBadges : []}
                stackTopTags={stackTopTags.length ? stackTopTags : []}
                stackBadgeNetwork={
                  stackBadgeNetwork.length ? stackBadgeNetwork : []
                }
                stackPrivileges={stackPrivileges.length ? stackPrivileges : []}
                stackDailyRep={stackDailyRep.length ? stackDailyRep : []}
              />
            </div>
          </div>
        </div>
      )
    }
  }
)
