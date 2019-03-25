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

export class AllProblems extends Component {
  componentDidMount() {
    // console.log(this.props)
    this.props.fetchAllProblems()
    history.push('/problems')
  }
  render() {
    if (!this.props.allProblems) {
      return <div>Loading</div>
    }
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

export const ProblemMap = connect(mapStateToProps, mapDispatchToProps)(
  AllProblems
)
