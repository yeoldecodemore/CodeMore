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
        <Link to={{pathname: '/home', state: {prevPath: location.pathname}}}>
          Home
        </Link>
        <Link to="/problems">Problems</Link>
        <Link to="/codewars">Profile</Link>
        <a href="#" onClick={handleClick}>
          Logout
        </a>
        <hr />
      </nav>
    ) : null}
  </div>
))
