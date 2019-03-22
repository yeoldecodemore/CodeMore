import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllProblems} from '../store/'
import history from '../history'

const mapStateToProps = ({problemReducer}) => ({
  allProblems: problemReducer.allProblems
})

const mapDispatchToProps = dispatch => ({
  fetchAllProblems: () => dispatch(fetchAllProblems())
})

export const ProblemMap = connect(mapStateToProps, mapDispatchToProps)(
  class AllProblems extends Component {
    componentDidMount() {
      this.props.fetchAllProblems()
      history.push('/problems')
    }
    render() {
      return (
        <div className="allProblems">
          {this.props.allProblems.map(problem => {
            return (
              <Link
                className="problemBtn"
                to={`problems/${problem.problemSlug}`}
                key={`${problem.problemSlug}`}
              >
                {`${problem.problemName}`}
                <br />
              </Link>
            )
          })}
        </div>
      )
    }
  }
)
