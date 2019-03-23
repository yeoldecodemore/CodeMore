import React, {Component} from 'react'
import {connect} from 'react-redux'
import AceEditor from 'react-ace'
import ls from 'local-storage'
import axios from 'axios'
import {ProblemMap, AllProblems} from './AllProblems'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import {Link} from 'react-router-dom'

import {fetchSingleProblem, fetchAllProblems} from '../store/'

const mapStateToProps = ({problemReducer}) => ({
  singleProblem: problemReducer.singleProblem,
  allProblems: problemReducer.allProblems
})

export default connect(mapStateToProps, {fetchSingleProblem, fetchAllProblems})(
  class Editor extends Component {
    state = {
      usersCode: '',
      error: false,
      results: [],
      tests: [],
      consoleLogs: ''
    }

    async componentDidMount() {
      await this.props.fetchAllProblems()
      this.setUpProblem()
    }

    setUpProblem = async problem => {
      const probName = problem || this.props.match.params.problemName
      await this.props.fetchSingleProblem(probName)
      const {problemSlug, problemTemplate} = this.props.singleProblem
      if (ls.get(`${problemSlug}`) === null) {
        ls.set(`${problemSlug}`, `${problemTemplate}`)
      }
      this.setState({
        usersCode: ls.get(`${problemSlug}`)
      })
    }

    userUpdateCode = newValue => {
      this.setState({
        usersCode: newValue
      })
      ls.set(`${this.props.singleProblem.problemSlug}`, newValue)
    }

    changeProblem = problem => {
      this.setUpProblem(problem.problemSlug)
      this.setState({
        error: false,
        results: [],
        tests: [],
        consoleLogs: ''
      })
    }

    getLineWarnings = () =>
      [...document.getElementsByClassName('ace_info')].map(
        item => +item.innerHTML - 1
      )

    addSemiColons = code =>
      code.map(
        (line, index) =>
          this.getLineWarnings().includes(index) ? line.concat(';') : line
      )

    convertComments = code =>
      code.map(line => (line.includes('//') ? `/* ${line} */ ` : line))

    sanitizeUserCode = newValue => {
      newValue = newValue.split('\n')

      newValue = this.addSemiColons(newValue)
      newValue = this.convertComments(newValue)

      return newValue.join('\n')
    }

    toggleRunCodeBtn = (target, running) => {
      target.innerHTML = running ? 'loading...' : 'Run Code'
      target.disabled = running
      target.style.backgroundColor = running ? 'grey' : '#003012d9'
    }

    executeCode = async code => {
      const {id, problemSlug} = this.props.singleProblem
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
        let code = this.sanitizeUserCode(target.value)
        const {tests, result} = await this.executeCode(code)
        this.toggleRunCodeBtn(target, false)
        const hasConsoleLogs =
          typeof result === 'string' && result.charAt(0) !== '{'

        const {error, errorMessage} = this.checkIfError(result)

        if (error) {
          this.setState({results: errorMessage, error: true, tests})
        } else if (hasConsoleLogs) {
          const consoleLogs = result.slice(0, result.indexOf('{\n'))
          const resultsStr = '{' + result.slice(result.indexOf('"stats":'))
          const resultsObj = JSON.parse(resultsStr)
          const results = this.formatResults(resultsObj)
          this.setState({results, error: false, tests, consoleLogs})
        } else {
          const results = this.formatResults(result)
          this.setState({results, error: false, tests, consoleLogs: ''})
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
          <div className="problemList allProblems">
            {this.props.allProblems.map(problem => {
              return (
                <Link
                  className="problemBtn"
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

          <div className="containerProblem">
            <div className="problemDesc">
              {this.props.singleProblem.problemDescription}
            </div>

            <div />
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
            <div>
              <button
                type="button"
                onClick={this.evaluateCode}
                value={this.state.usersCode}
                className="runCodeBtn"
              >
                Run Code
              </button>
            </div>
          </div>
          <div className="containerResults tests">
            <div className="consoleBlock">
              <p>Console</p>
              <p>{this.state.consoleLogs ? this.state.consoleLogs : ''}</p>
            </div>
            <div className="resultBlock">
              Results<br />
              {this.state.error ? (
                <p style={{backgroundColor: 'red'}}>{this.state.results}</p>
              ) : (
                <div>
                  {this.state.results.map((item, idx) => (
                    <p key={idx}>{item}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="testBlock">
              <p>Tests</p>
              {this.state.tests.map(item => (
                <p key={item.id}>{item.testTemplate}</p>
              ))}
            </div>
          </div>
        </div>
      )
    }
  }
)
