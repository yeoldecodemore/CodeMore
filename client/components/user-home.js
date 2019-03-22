/* eslint-disable react/display-name */
import React from 'react'
import Container from './DataEntryForm/container'
import {connect} from 'react-redux'
import {_isDataMissing} from '../helperfuncs'
import {Codewars} from './Codewars'

const mapState = ({userReducer}) => ({
  githubId: userReducer.githubId,
  formdata: [
    userReducer.codewars,
    userReducer.email,
    userReducer.stackoverflow,
    userReducer.medium,
    userReducer.hackernoon
  ]
})

export default connect(mapState)(({githubId, formdata, location: {state}}) => {
  return (
    <div>
      <h1 className="profileWelcome">Welcome to the profile</h1>
      {_isDataMissing(formdata) ? null : state &&
      state.prevPath &&
      state.prevPath !== '/problems' ? null : (
        <Container />
      )}

      <div className="codewars">
        <Codewars />
      </div>
    </div>
  )
})
