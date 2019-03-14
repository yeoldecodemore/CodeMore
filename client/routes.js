import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import {LandingPage, UserHome} from './components'
import {me} from './store'

const mapState = state => ({
  isLoggedIn: !!state.user.id
})

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me())
})

export default withRouter(
  connect(mapState, mapDispatch)(
    class Routes extends Component {
      componentDidMount() {
        this.props.loadInitialData()
      }

      render() {
        const {isLoggedIn} = this.props

        return isLoggedIn ? (
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/home" component={UserHome} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={LandingPage} />
          </Switch>
        )
      }
    }
  )
)
