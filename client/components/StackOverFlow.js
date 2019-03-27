import React, {Component} from 'react'
import {connect} from 'react-redux'
import {} from 'react-icons/fa'
import userReducer from '../store/userReducer'
import {Line} from 'react-chartjs-2'

const mapStateToProps = () => ({
  userId: userReducer.id
})

const mapDispatchToProps = dispatch => ({})

export const StackOverFlow = connect(mapStateToProps, mapDispatchToProps)(
  class StackOverFlow extends Component {
    constructor() {
      super()
    }
    render() {
      const {stackoverflowData} = this.props
      const privilegeslabels =
        stackoverflowData
          .sort((a, b) => (a.reputation > b.reputation ? -1 : 1))
          .map(val => val.short_description)
          .splice(0, 5) || []
      const privilegesData =
        stackoverflowData
          .sort((a, b) => (a.reputation > b.reputation ? -1 : 1))
          .map(val => val.reputation)
          .splice(0, 5) || []

      const data = {
        labels: privilegeslabels,
        datasets: [
          {
            label: 'Reputations',
            data: privilegesData,
            fill: false, // Don't fill area under the line
            borderColor: 'purple' // Line color
          }
        ]
      }
      return (
        <div className="stackoverflow">
          <Line data={data} />
        </div>
      )
    }
  }
)
