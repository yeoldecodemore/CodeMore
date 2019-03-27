import React, {Component} from 'react'
import {connect} from 'react-redux'
import userReducer from '../store/userReducer'

const mapStateToProps = state => ({
  user: state.userReducer
})

export const ProfilePhoto = connect(mapStateToProps)(
  class Medium extends Component {
    constructor() {
      super()
    }

    componentDidMount() {}
    render() {
      return (
        <div className="profilePhoto clip-circle">
          <img className="clip-circle" src={this.props.user.imageUrl} />
        </div>
      )
    }
  }
)
