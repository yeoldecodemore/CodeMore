import React, {Component} from 'react'
import {connect} from 'react-redux'
import hackernoonReducer, {findHackernoon} from '../store'
import mediumReducer, {findMedium} from '../store'
import userReducer from '../store/userReducer'

const mapStateToProps = () => ({
  userId: userReducer.id,
  medium: mediumReducer,
  hackernoon: hackernoonReducer
})

const mapDispatchToProps = dispatch => ({
  findMedium: id => dispatch(findMedium(id)),
  findHackernoon: id => dispatch(findHackernoon(id))
})

export const Medium = connect(mapStateToProps, mapDispatchToProps)(
  class Medium extends Component {
    constructor() {
      super()
    }

    componentDidMount() {
      // this.props.findMedium(this.props.userId)
      // this.props.findHackernoon(this.props.userId)
    }

    render() {
      // const {medium, hackernoon} = this.props || ''
      return (
        <div className="medium">
          <img
            className="mediumImage"
            src="http://chittagongit.com/images/medium-icon-png/medium-icon-png-26.jpg"
          />
          <div>
            <h4>Most Recent Article Title: </h4>
            <h4>Claps: </h4>
          </div>
        </div>
      )
    }
  }
)
