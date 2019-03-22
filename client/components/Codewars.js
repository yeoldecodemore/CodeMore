import React, {Component} from 'react'
import {connect} from 'react-redux'
import {findCodewars} from '../store/'
import userReducer from '../store/userReducer'

const mapStateToProps = ({codewarReducer, userReducer}) => ({
  userId: userReducer.id,
  codeWars: codewarReducer
})

const mapDispatchToProps = dispatch => ({
  findCodewars: id => dispatch(findCodewars(id))
})

export const Codewars = connect(mapStateToProps, mapDispatchToProps)(
  class Codewars extends Component {
    componentDidMount() {
      this.props.findCodewars(this.props.userId)
    }
    render() {
      console.log(this.props.codeWars)
      return (
        <div>
          <h1 />
        </div>
      )
    }
  }
)
