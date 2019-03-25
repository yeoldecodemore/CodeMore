import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Codewars} from './Codewars'
import {Medium} from './Medium'
import {Github} from './Github'
import {StackOverFlow} from './StackOverFlow'
import userReducer from '../store/userReducer'

const mapStateToProps = () => ({
  user: userReducer
})

const mapDispatchToProps = dispatch => ({
  fetchAllProblems: () => dispatch(fetchAllProblems())
})

export default connect(mapStateToProps, mapDispatchToProps)(
  class Profile extends Component {
    componentDidMount() {}
    render() {
      return (
        <div className="profile">
          <div className="info">
            <div className="userImage">I am an image!!!!!!!!</div>
            <div className="greenies">I am the greenies</div>
          </div>
          <div className="stats">
            <div className="dataOne">
              <Codewars />
              <Github />
            </div>
            <div className="dataTwo">
              <Medium />
              <StackOverFlow />
            </div>
          </div>
        </div>
      )
    }
  }
)
