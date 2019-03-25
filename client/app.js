/* eslint-disable react/display-name */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Navbar} from './components'
import Routes from './routes'
import {_filterTruthyData} from './helperfuncs/'
const CronJob = require('cron').CronJob

import {ToastsContainer, ToastsStore} from 'react-toasts'
import {
  me,
  fetchGithub,
  fetchCodewars,
  fetchHackernoon,
  fetchMedium,
  fetchStackoverflow
} from './store'

const mapState = ({userReducer}) => ({
  userId: userReducer.id,
  formdata: {
    Codewars: userReducer.codewars,
    Github: userReducer.username,
    Stackoverflow: userReducer.stackoverflow,
    Medium: userReducer.medium,
    Hackernoon: userReducer.hackernoon
  }
})

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me()),
  fetchGithub: (userId, username) => dispatch(fetchGithub(userId, username)),
  fetchCodewars: (userId, username) =>
    dispatch(fetchCodewars(userId, username)),
  fetchMedium: (userId, username) => dispatch(fetchMedium(userId, username)),
  fetchHackernoon: (userId, username) =>
    dispatch(fetchHackernoon(userId, username)),
  fetchStackoverflow: (userId, username) =>
    dispatch(fetchStackoverflow(userId, username))
})

export default withRouter(
  connect(mapState, mapDispatch)(
    class App extends Component {
      constructor(props) {
        super(props)
        this.state = {
          job: 0
        }
      }
      jobCreator = callback => new CronJob('0 */60 9-17 * * 0-6', callback)

      componentDidMount() {
        this.props.loadInitialData()
        const job = this.jobCreator(() => {
          const truthyData = _filterTruthyData(this.props.formdata)
          Object.keys(truthyData).forEach(val => {
            this.props[`fetch${val}`](this.props.userId, truthyData[val])
          })
        })
        this.setState({job})
        job.start()
      }
      render() {
        console.log(this.state.job.running)
        return (
          <div className="LandingPage">
            <Navbar />
            <Routes />
            <ToastsContainer store={ToastsStore} />
          </div>
        )
      }
    }
  )
)
