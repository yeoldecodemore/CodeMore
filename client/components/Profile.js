import React, {Component} from 'react'
import {connect} from 'react-redux'
import Codewars from './Codewars'
import Medium from './Medium'
import {Github} from './Github'
import {StackOverFlow} from './StackOverFlow'
import {findCodewars, findMedium, findHackernoon} from '../store/'

const mapStateToProps = ({
  userReducer,
  codewarsReducer,
  mediumReducer,
  hackernoonReducer
}) => ({
  userId: userReducer.id,
  codewars: userReducer.codewars, //username in usermodel
  codewarsLanguages: codewarsReducer.codewarsLanguages,
  codewarsQuestions: codewarsReducer.codewarsQuestions,
  generalCodewars: codewarsReducer.generalCodewars,
  medium: userReducer.medium, //username in usermodel
  mediumPosts: mediumReducer.mediumPosts,
  hackernoon: userReducer.hackernoon, //username in usermodel
  hackernoonPosts: hackernoonReducer.hackernoonPosts
})

const mapDispatchToProps = dispatch => ({
  findCodewars: userId => dispatch(findCodewars(userId)),
  findMedium: userId => dispatch(findMedium(userId)),
  findHackernoon: userId => dispatch(findHackernoon(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  class Profile extends Component {
    componentDidMount() {
      if (this.props.codewars) this.props.findCodewars(this.props.userId)
      if (this.props.medium) this.props.findMedium(this.props.userId)
      if (this.props.hackernoon) this.props.findHackernoon(this.props.userId)
    }
    render() {
      const {
        codewarsLanguages,
        codewarsQuestions,
        generalCodewars,
        medium,
        codewars,
        mediumPosts,
        hackernoonPosts
      } = this.props

      console.log('profile', mediumPosts, hackernoonPosts)
      return (
        <div className="profile">
          {/* <div className="info">
            <div className="userImage" />
            <div className="greenies" />
          </div> */}
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
              <Github />
            </div>
            <div className="dataTwo">
              <Medium
                mediumPosts={mediumPosts.length ? mediumPosts : [{claps: 0}]}
                hackernoonPosts={
                  hackernoonPosts.length ? hackernoonPosts : [{claps: 0}]
                }
                medium={medium}
              />
              <StackOverFlow />
            </div>
          </div>
        </div>
      )
    }
  }
)
