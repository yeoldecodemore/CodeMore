import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Codewars} from './Codewars'

const mapStateToProps = ({codewarReducer, userReducer}) => ({
  user: userReducer
})

export const Dashboard = connect(mapStateToProps)(
  class Dashboard extends Component {
    constructor() {
      super()
    }

    render() {
      return (
        <div className="dashboard">
          <div className="personalInfo">
            <div className="profileImage">
              {/* <img src={`${this.props.user.imageUrl}`} /> */}
            </div>
            <div className="greenies">This is the greenies</div>
          </div>
          <div className="statsInfo" />
        </div>
      )
    }
  }
)
