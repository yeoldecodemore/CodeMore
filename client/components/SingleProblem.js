import React, {Component} from 'react'
import {connect} from 'react-redux'
import AceEditor from 'react-ace'
import ls from 'local-storage'

import 'brace/mode/javascript'
import 'brace/theme/monokai'

import {fetchSingleProblem} from '../store/'

const mapStateToProps = ({problem}) => ({
  singleProblem: problem.singleProblem
})

// const mapDispatchToProps = dispatch => ({
//   fetchSingleProblem: problemName => dispatch(fetchSingleProblem(problemName))
// })

export default connect(mapStateToProps, {fetchSingleProblem})(
  class Editor extends Component {
    state = {
      usersCode: ''
    }

    //local storage id will be github userId _ problem name
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

    runCode = () => {}
    //send to docker like:
    /*

  {
    code : 'usercode'
  }
  */

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

          <button type="button" onClick={this.runCode}>
            Run Code
          </button>
        </div>
      )
    }
  }
)
