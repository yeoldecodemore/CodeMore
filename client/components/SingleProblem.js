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
      testResults: {}
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

    runCode = async e => {
      try {
        let code = this.sanitize(e.target.value)
        console.log(code)

        const {id, problemSlug} = this.props.singleProblem

        const userProblem = {
          id: `${problemSlug}_${id}`,
          problemId: id,
          slug: problemSlug,
          code: code
        }
        let {data} = await axios.post(
          `/api/dockerTest/${problemSlug}`,
          userProblem
        )
        data = this.getTestResults(data)
        this.setState({testResults: data})
      } catch (error) {
        console.log(error)
      }
    }

    getTestResults(data) {
      var lines = data.split('\n')
      lines.splice(0, 1)
      var newtext = lines.join('\n') + '}'
      let results = JSON.parse(newtext)
      return results
    }

    render() {
      return (
        <div>
          <div>{this.props.singleProblem.problemDescription}</div>
          <AceEditor
            mode="javascript"
            theme="monokai"
            onChange={this.onChange}
            name="editor"
            className="editor"
            value={this.state.usersCode}
            fontSize={16}
            editorProps={{$blockScrolling: Infinity}}
            style={{width: '40em', height: '25em'}}
          />

          <div>
            {this.state.testResults.tests ? (
              <div>
                {this.state.testResults.tests.map(test => {
                  return (
                    <div key={test.title}>
                      {`${test.title} ${
                        test.err.message ? 'failed' : 'passed'
                      }`}
                    </div>
                  )
                })}
              </div>
            ) : (
              <p>Run Code To See Results</p>
            )}
          </div>
          <button
            type="button"
            onClick={this.runCode}
            value={this.state.usersCode}
          >
            Run Code
          </button>
        </div>
      )
    }
  }
)
