import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {logout} from '../store'

const mapState = ({userReducer}) => ({
  isLoggedIn: !!userReducer.id
})

const mapDispatch = dispatch => ({
  handleClick: () => dispatch(logout())
})

export default withRouter(
  connect(mapState, mapDispatch)(({handleClick, isLoggedIn}) => (
    <div className="navbar">
      {!isLoggedIn && <h1 className="loggedoutNavhead banner">Codemore</h1>}
      {isLoggedIn ? (
        <nav>
          <h1 className="loggedinNavhead banner">Codemore</h1>

          <Link to="/problems/backwards_array" className="navBtn">
            Problems
          </Link>
          <Link
            to={{pathname: '/home', state: {prevPath: location.pathname}}}
            className="navBtn"
          >
            Profile
          </Link>

          <a href="#" onClick={handleClick} className="navBtn">
            Logout
          </a>
        </nav>
      ) : null}
    </div>
  ))
)
