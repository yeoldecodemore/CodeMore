import React, {Component} from 'react'
import {connect} from 'react-redux'
import {findCodewars} from '../store/'

const mapStateToProps = ({codewarReducer, userReducer}) => ({
  userId: userReducer.id,
  codeWars: codewarReducer
})

const mapDispatchToProps = dispatch => ({
  findCodewars: id => dispatch(findCodewars(id))
})

export const Codewars = connect(mapStateToProps, mapDispatchToProps)(
  class Codewars extends Component {
    constructor() {
      super()
    }
    componentDidMount() {
      // this.props.findCodewars(this.props.userId);
    }

    render() {
      return (
        <div>
          <div className="codewars">
            <img
              className="codewarsImage"
              src="https://int4fc.com/sites/default/files/articles/Abdul_CodeWars.png"
            />

            <div className="codewarsInfo">
              <div>
                <h4>
                  Current Rank: <span />
                </h4>
              </div>
              <div className="languages">
                <h4>Codewar Languages: </h4>
              </div>
              <div className="languages" />
              <div className="languages">
                <h4>Codewars Completed: </h4>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
)
