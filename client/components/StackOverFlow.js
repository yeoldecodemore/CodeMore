import React, {Component} from 'react'
import {connect} from 'react-redux'
import {} from 'react-icons/fa'
import userReducer from '../store/userReducer'

const mapStateToProps = () => ({
  userId: userReducer.id
})

const mapDispatchToProps = dispatch => ({})

export const StackOverFlow = connect(mapStateToProps, mapDispatchToProps)(
  class StackOverFlow extends Component {
    constructor() {
      super()
    }

    componentDidMount() {}

    render() {
      return <div className="stackoverflow" />
    }
  }
)
