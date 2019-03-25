/* eslint-disable react/display-name */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Navbar} from './components'
import Routes from './routes'
import {_filterTruthyData, _sentenceCase} from './helperfuncs/'
const CronJob = require('cron').CronJob

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
  fetchGithub: userId => dispatch(fetchGithub(userId)),
  fetchCodewars: userId => dispatch(fetchCodewars(userId)),
  fetchMedium: userId => dispatch(fetchMedium(userId)),
  fetchHackernoon: userId => dispatch(fetchHackernoon(userId)),
  fetchStackoverflow: userId => dispatch(fetchStackoverflow(userId))
})

export default withRouter(
  connect(mapState, mapDispatch)(
    class App extends Component {
      job = new CronJob(`0 */5 21 * * 6`, function() {
        console.log('CRONJOB')
        _filterTruthyData(Object.keys(this.props.formdata)).forEach(val =>
          this.props[`fetch${val}`](this.props.userId)
        )
      })

      componentDidMount() {
        this.job.start()
        this.props.loadInitialData()
      }
      render() {
        console.log('is job running? ', this.job.running)
        return (
          <div className={this.props.userId ? 'LoggedPage' : 'LandingPage'}>
            <Navbar />
            <Routes />
          </div>
        )
      }
    }
  )
)

// !this.props.isLoggedIn
// ? 'LandingPage'
// : _isDataMissing(this.props.formdata)
//   ? 'LandingPage'
//   : 'LoggedPage'
// if(logged in){
//   if(data is missing){
//   landingpage
//   }
//   loggedpage
// }
// landing page
