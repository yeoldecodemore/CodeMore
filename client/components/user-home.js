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

export default connect(mapState)(({githubId, formdata, location: {state}}) => {
  return (
    <div>
      <h3>Welcome, {githubId}</h3>
      {_isDataMissing(formdata) ? null : state &&
      state.prevPath &&
      state.prevPath !== '/problems' ? null : (
        <Container />
      )}
    </div>
  )
})

// if(data is missing){
//   if(prev path is problems){
//     null
//   }
//   container
// }
// null

// if(!_isDataMissing(formdata)){
//   if(prevPath && prevPath !== '/problems'){
//     null
//   }
//   <Container />
// }
// null
