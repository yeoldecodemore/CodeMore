/* eslint-disable react/display-name */
import React from 'react'
import Container from './DataEntryForm/container'
import {connect} from 'react-redux'
import {_isDataMissing} from '../helperfuncs'

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

export default connect(mapState)(({githubId, formdata}) => (
  <div>
    <h3>Welcome, {githubId}</h3>
    {!_isDataMissing(formdata) ? <Container /> : null}
  </div>
))
