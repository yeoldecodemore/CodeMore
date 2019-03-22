import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const mapState = ({userReducer}) => ({
  isLoggedIn: !!userReducer.id
})

const mapDispatch = dispatch => ({
  handleClick: () => dispatch(logout())
})

export default connect(mapState, mapDispatch)(({handleClick, isLoggedIn}) => (
  <div className="navbar">
    <h1 className={isLoggedIn ? 'loggedinNavhead' : 'loggedoutNavhead'}>
      Codemore
    </h1>
    {isLoggedIn ? (
      <nav>
        <Link
          to={{pathname: '/home', state: {prevPath: location.pathname}}}
          className="navBtn"
        >
          Profile
        </Link>
        <Link to="/problems" className="navBtn">
          Problems
        </Link>
        <a href="#" onClick={handleClick} className="navBtn">
          Logout
        </a>
      </nav>
    ) : null}
  </div>
))
