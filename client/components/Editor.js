import React, {Component} from 'react'
import {connect} from 'react-redux'
import AceEditor from 'react-ace'

import ls from 'local-storage'

import 'brace/mode/javascript'
import 'brace/theme/monokai'

class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usersCode: ''
    }
    this.onChange = this.onChange.bind(this)
    this.runCode = this.runCode.bind(this)
  }

  //local storage id will be github userId _ problem name
  componentDidMount() {
    if (ls.get('1') === null) {
      ls.set('1', 'problemtemplate{\n\n}')
    }
    this.setState({usersCode: ls.get('1')})
  }
  onChange = newValue => {
    this.setState({
      usersCode: newValue
    })
    ls.set('1', newValue) //|| 'problem template')
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
        <AceEditor
          mode="javascript"
          theme="monokai"
          onChange={this.onChange}
          name="editor"
          className="editor"
          value={this.state.usersCode} //|| ls.get('1')}
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

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

export const CodeEditor = connect(mapStateToProps, mapDispatchToProps)(Editor)
