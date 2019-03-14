import React from 'react'
import {connect} from 'react-redux'

const mapState = state => ({
  githubId: state.user.githubId
})

export default connect(mapState)(({githubId}) => (
  <div>
    <h3>Welcome, {githubId}</h3>
  </div>
))
