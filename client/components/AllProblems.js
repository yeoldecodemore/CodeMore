import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllProblems} from '../store/'

class AllProblems extends Component {
  componentDidMount() {
    this.props.fetchAllProblems()
  }
  render() {
    return (
      <div>
        {this.props.allProblems.map(problem => {
          return (
            <Link
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

const mapStateToProps = state => ({
  allProblems: state.problem.allProblems
})

const mapDispatchToProps = dispatch => ({
  fetchAllProblems: () => dispatch(fetchAllProblems())
})

export const ProblemMap = connect(mapStateToProps, mapDispatchToProps)(
  AllProblems
)
