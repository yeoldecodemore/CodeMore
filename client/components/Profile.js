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
        mediumPosts,
        hackernoonPosts
      } = this.props
      return (
        <div className="profile">
          {/* <div className="info">
            <div className="userImage" />
            <div className="greenies" />
          </div> */}
          <div className="stats">
            <div className="dataOne">
              <Codewars
                codewarsLanguages={codewarsLanguages || []}
                codewarsQuestions={codewarsQuestions || []}
                generalCodewars={generalCodewars || {}}
              />
              <Github />
            </div>
            <div className="dataTwo">
              <Medium
                mediumPosts={mediumPosts || []}
                hackernoonPosts={hackernoonPosts || []}
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
