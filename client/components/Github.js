import React, {Component} from 'react'
import {connect} from 'react-redux'
import {} from 'react-icons/fa'
import userReducer from '../store/userReducer'
import {Line} from 'react-chartjs-2'

const mapStateToProps = () => ({
  userId: userReducer.id
})

const mapDispatchToProps = dispatch => ({})

export const Github = connect(mapStateToProps, mapDispatchToProps)(
  class Github extends Component {
    constructor() {
      super()
    }

    render() {
      return <div className="github" />
    }
  }
)
