import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const mapStateToProps = ({problemReducer}) => ({
  allProblems: problemReducer.allProblems
})

const mapDispatchToProps = dispatch => ({
  fetchAllProblems: () => dispatch(fetchAllProblems())
})

export default connect(mapStateToProps, mapDispatchToProps)(
  class Profile extends Component {
    componentDidMount() {}
    render() {
      return (
        <div className="profile">
          <div className="info">
            <div className="userImage">I am an image!!!!!!!!!!!!!!!!</div>
            <div className="greenies">I am the greenies</div>
          </div>
          <div className="stats">
            <div className="dataOne">
              <div className="codewars">Codewars</div>
              <div className="github">Github</div>
            </div>
            <div className="dataTwo">
              <div className="medium">Medium</div>
              <div className="stackoverflow">StackOverFlow</div>
            </div>
          </div>
        </div>
      )
    }
  }
)
