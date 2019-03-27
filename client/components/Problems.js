import React, {Component} from 'react'
import {connect} from 'react-redux'
import AceEditor from 'react-ace'
import ls from 'local-storage'
import axios from 'axios'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import {Link} from 'react-router-dom'
import {_sanitizeCode} from '../helperfuncs'

import {fetchAllProblems, fetchAllTests, updateUserStats} from '../store/'

const mapStateToProps = ({problemReducer}) => ({
  allProblems: problemReducer.allProblems,
  allTests: problemReducer.allTests
})

export default connect(mapStateToProps, {
  fetchAllProblems,
  fetchAllTests,
  updateUserStats
})(
  class Editor extends Component {
    constructor() {
      super()
      this.state = {
        usersCode: '',
        error: false,
        results: [],
        tests: [],
        consoleLogs: '',
        resultsOrConsole: 'results'
      }

    }

    async componentDidMount() {
      await this.props.fetchAllProblems()
      await this.props.fetchAllTests()
      this.setUpProblem(this.props.allProblems[0])
      // axios.post('https://codemore-docker.herokuapp.com/testing')
    }

    setUpProblem = problem => {
      // const probSlug =
      //   problem.problemSlug || this.props.match.params.problemName
      const {problemSlug, problemTemplate} = problem
        ? problem
        : {
            problemSlug: this.props.match.params.problemName,
            problemTemplate: `const backwardsArray = (n) => {\n\n
      }`
          }
      // const probSlug = problemSlug || this.props.match.params.problemName

      if (ls.get(`${problemSlug}`) === null) {
        ls.set(`${problemSlug}`, `${problemTemplate}`)
      }
      this.setState({
        usersCode: ls.get(`${problemSlug}`),
        singleProblem: {
          ...problem,
          tests: this.props.allTests.filter(
            item => item.problemId === problem.id
          )
        }
      })
    }

    userUpdateCode = newValue => {
      this.setState({
        usersCode: newValue
      })
      ls.set(`${this.state.singleProblem.problemSlug}`, newValue)
    }

    changeProblem = problem => {
      this.setUpProblem(problem)
      // this.setState({
      //   error: false,
      //   results: [],
      //   consoleLogs: ''
      // })
    }

    toggleRunCodeBtn = (target, running) => {
      target.innerHTML = running ? 'loading...' : 'Run Code'
      target.disabled = running
      target.style.backgroundColor = running ? 'grey' : '#003012d9'
    }

    executeCode = async code => {
      const {id, problemSlug} = this.state.singleProblem
      const userProblem = {
        id: `${problemSlug}_${id}`,
        problemId: id,
        slug: problemSlug,
        code
      }
      let {data} = await axios.post(`/api/docker/${problemSlug}`, userProblem)
      return data
    }

    checkIfError = result =>
      typeof result === 'object'
        ? {
            error: false,
            errorMessage: ''
          }
        : {
            error: result.split('\n')[4].includes('SyntaxError' || 'TypeError'),
            errorMessage: result.split('\n')[4]
          }

    evaluateCode = async e => {
      try {
        const target = e.target
        this.toggleRunCodeBtn(target, true)
        let code = _sanitizeCode(target.value)
        const {tests, result} = await this.executeCode(code)
        this.toggleRunCodeBtn(target, false)
        const hasConsoleLogs =
          typeof result === 'string' && result.charAt(0) !== '{'
        const {error, errorMessage} = this.checkIfError(result)
        if (error) {
          this.setState({
            results: errorMessage || 'Timed Out',
            error: true,
            tests
          })
        } else {
          const results =
            typeof result === 'string'
              ? this.formatResults(
                  JSON.parse('{' + result.slice(result.indexOf('"stats":')))
                )
              : this.formatResults(result)

          const consoleLogs =
            hasConsoleLogs &&
            result.slice(0, result.indexOf('{\n') - 1).split('\n')
          this.setState({results, error: false, tests, consoleLogs})
        }
      } catch (error) {
        console.log(error)
      }
    }

    formatResults = resultObj => {
      let {failures, passes} = resultObj
      let fStat = failures.map(
        item => item.title + ' failed - ' + item.err.message
      )
      let pStat = passes.map(item => item.title + ' passed')
      return [...fStat, ...pStat].sort()
    }
    render() {
      return (
        <div className="problemsPage">
          <div className="problemList">
            <p className="problemTitle">Problems</p>
            <div className="problems">
              {this.props.allProblems.map(problem => {
                return (
                  <Link
                    className={`problemBtn + ${
                      problem.id === this.state.singleProblem.id
                        ? 'selected'
                        : ''
                    }`}
                    value={`${problem.problemSlug}`}
                    onClick={() => this.changeProblem(problem)}
                    to={`${problem.problemSlug}`}
                    key={`${problem.problemSlug}`}
                  >
                    {`${problem.problemName}`}
                    <br />
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="containerProblem">
            <p className="problemTitle">Instructions</p>

            <div className="problemDesc">
              {this.state.singleProblem
                ? this.state.singleProblem.problemDescription
                : 'nothing'}
            </div>

            <AceEditor
              mode="javascript"
              theme="monokai"
              onChange={this.userUpdateCode}
              name="editor"
              className="editor"
              value={this.state.usersCode}
              fontSize={16}
              editorProps={{$blockScrolling: Infinity}}
              style={{width: '100%', height: '25em'}}
            />

            <button
              type="button"
              onClick={this.evaluateCode}
              value={this.state.usersCode}
              className="runCodeBtn"
            >
              Run Code
            </button>
          </div>
          <div className="containerResults tests">
            <div className="responseButtons">
              <button
                type="button"
                className="resultBtn"
                onClick={() => this.setState({resultsOrConsole: 'results'})}
              >
                Results
              </button>
              <button
                type="button"
                className="resultBtn"
                onClick={() => this.setState({resultsOrConsole: 'console'})}
              >
                Console
              </button>
            </div>
            <div className="resultsBlock">
              {this.state.resultsOrConsole === 'console' ? (
                <div>
                  <p className="resultTitle">Console</p>
                  {this.state.consoleLogs
                    ? this.state.consoleLogs.map((el, idx) => (
                        <p key={idx}>{el}</p>
                      ))
                    : ''}
                </div>
              ) : (
                <div>
                  <p className="resultTitle">Results</p>
                  {this.state.error ? (
                    <p style={{backgroundColor: 'red'}}>{this.state.results}</p>
                  ) : (
                    <div>
                      {this.state.results.map(item => (
                        <p
                          key={item}
                          className={
                            item.includes('failed') ? 'failed' : 'passed'
                          }
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="testBlock">
              <p className="testsTitle">Tests</p>
              {this.state.singleProblem.tests
                ? this.state.singleProblem.tests.map(item => (
                    <p key={item.id}>{item.testTemplate}</p>
                  ))
                : null}
            </div>
          </div>
        </div>
      )
    }
  }
)
