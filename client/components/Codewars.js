import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {findCodewars, getUserId} from '../store/'
import userReducer from '../store/userReducer'

const mapStateToProps = ({codewarReducer}) => ({
  userId: userReducer.id,
  codeWars: codewarReducer
})

const mapDispatchToProps = dispatch => ({
  getUserId: () => dispatch(getUserId()),
  findCodeWars: id => dispatch(findCodeWars())
})

export const Codewars = connect(mapStateToProps, mapDispatchToProps)(
  class Codewars extends Component {
    componentDidMount() {
      const id = this.props.getUserId()
      this.props.findCodeWars(id)
    }
    render() {
      return <div>{`${this.props.codeWars}`}</div>
    }
  }
)
