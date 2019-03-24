import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Codewars} from './Codewars'
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
            <div className="userImage">I am an image!!!!!!!!!!!!!!!!</div>
            <div className="greenies">I am the greenies</div>
          </div>
          <div className="stats">
            <div className="dataOne">
              <Codewars />
              <div className="github">Github</div>
            </div>
            <div className="dataTwo">
              <div className="medium">
                <img
                  className="mediumImage"
                  src="http://chittagongit.com/images/medium-icon-png/medium-icon-png-26.jpg"
                />
              </div>
              <div className="stackoverflow">StackOverFlow</div>
            </div>
          </div>
        </div>
      )
    }
  }
)
