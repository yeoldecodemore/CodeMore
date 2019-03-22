import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import {LandingPage, UserHome, ProblemMap, Problem} from './components'
import {me} from './store'

const mapState = ({userReducer}) => ({
  isLoggedIn: !!userReducer.id
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
            <Route exact path="/form" component={LandingPage} />
            <Route path="/home" component={UserHome} />
            <Route exact path="/problems" component={Problem} />
            <Route exact path="/problems/:problemName" component={Problem} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route component={LandingPage} />
          </Switch>
        )
      }
    }
  )
)
