import React, {Component} from 'react'
import {connect} from 'react-redux'
import AceEditor from 'react-ace'
import ls from 'local-storage'
import axios from 'axios'

import 'brace/mode/javascript'
import 'brace/theme/monokai'

import {fetchSingleProblem} from '../store/'

const mapStateToProps = ({problemReducer}) => ({
  singleProblem: problemReducer.singleProblem
})

export default connect(mapStateToProps, {fetchSingleProblem})(
  class Editor extends Component {
    state = {
      usersCode: '',
      error: false,
      results: [],
      tests: []
    }

    async componentDidMount() {
      const probName = this.props.match.params.problemName
      await this.props.fetchSingleProblem(probName)
      const {problemSlug, problemTemplate} = this.props.singleProblem
      if (ls.get(`${problemSlug}`) === null) {
        ls.set(`${problemSlug}`, `${problemTemplate}`)
      }
      this.setState({
        usersCode: ls.get(`${problemSlug}`)
      })
    }

    onChange = newValue => {
      this.setState({
        usersCode: newValue
      })
      ls.set(`${this.props.singleProblem.problemSlug}`, newValue)
    }

    getLineWarnings = () =>
      [...document.getElementsByClassName('ace_info')].map(
        item => +item.innerHTML - 1
      )
    sanitize = newValue =>
      newValue
        .split('\n')
        .map(
          (line, index) =>
            this.getLineWarnings().includes(index) ? line.concat(';') : line
        )
        .join('')

    formatResults = resultObj => {
      let {failures, passes} = resultObj
      let fStat = failures.map(item => item.title + ' failed')
      let pStat = passes.map(item => item.title + ' passed')
      return [...fStat, ...pStat].sort()
    }

    runCode = async e => {
      try {
        let code = this.sanitize(e.target.value)
        const {id, problemSlug} = this.props.singleProblem
        const userProblem = {
          id: `${problemSlug}_${id}`,
          problemId: id,
          slug: problemSlug,
          code
        }
        let {data} = await axios.post(`/api/docker/${problemSlug}`, userProblem)
        const {tests, result} = data
        this.setState({tests})
        if (typeof result === 'string') {
          let error = result.split('\n')
          this.setState({results: error[4], error: true})
        } else {
          const results = this.formatResults(result)
          this.setState({results, error: false})
        }
      } catch (error) {
        console.log(error)
      }
    }

    getTestResults(data) {
      //Fix this to handle console.logs!!! always before the data
      var lines = data.split('\n')
      lines.splice(0, 1)
      var newtext = lines.join('\n') + '}'
      let results = JSON.parse(newtext)
      return results
    }

    render() {
      return (
        <div className="problemsPage">
          <div className="problemList">Problems</div>
          <div className="container">
            <div className="problemDesc">
              {this.props.singleProblem.problemDescription}
            </div>
            <div>
              <button
                type="button"
                onClick={this.runCode}
                value={this.state.usersCode}
                className="runCodeBtn"
              >
                Run Code
              </button>
            </div>
            <br />
            <div />
            <AceEditor
              mode="javascript"
              theme="monokai"
              onChange={this.onChange}
              name="editor"
              className="editor"
              value={this.state.usersCode}
              fontSize={16}
              editorProps={{$blockScrolling: Infinity}}
              style={{width: '100%', height: '25em'}}
            />
          </div>
          <div className="container tests">
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
