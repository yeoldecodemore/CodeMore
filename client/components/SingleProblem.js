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
      testResults: []
    }

    async componentDidMount() {
      const probName = this.props.match.params.problemName
      await this.props.fetchSingleProblem(probName)
      await this.props.updateUserStats()
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

    sanitize = newValue => {
      if (!newValue.endsWith(';')) newValue += ';'
      return newValue
    }

    runCode = async e => {
      try {
        let code = this.sanitize(e.target.value)

        const {id, problemSlug} = this.props.singleProblem

        const userProblem = {
          id: `${problemSlug}_${id}`,
          problemId: id,
          slug: problemSlug,
          code: code //this.state.usersCode
        }
        let {data} = await axios.post(`/api/dockerrodetwo/test`, userProblem)
        console.log(data)
        let results = []
        results.push(data.split(' ').filter(item => item))
        console.log(results)
        this.setState({testResults: data})
      } catch (error) {
        console.log(error)
      }
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
            style={{width: '50vw', height: '50vh'}}
          />
          <p>{this.state.testResults}</p>

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
