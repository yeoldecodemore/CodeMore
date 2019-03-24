import React, {Component} from 'react'
import {connect} from 'react-redux'
import {findCodewars} from '../store/'
import {FaQuestionCircle, FaCode} from 'react-icons/fa'

const mapStateToProps = ({codewarReducer, userReducer}) => ({
  userId: userReducer.id,
  codeWars: codewarReducer
})

export const Medium = connect(mapStateToProps)(
  class Medium extends Component {
    constructor() {
      super()
    }
    componentDidMount() {
      this.props.findCodewars(this.props.userId)
    }

    render() {
      const {codeWars} = this.props
      const kyuLevel = codeWars.generalCodewars.overallRankName || ''

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
                  Current Rank: <span>{`${kyuLevel}`}</span>
                </h4>
              </div>
              <div className="languages">
                <h4>Codewar Languages: </h4>
                {codeWars.generalCodewars.skills
                  ? codeWars.generalCodewars.skills.map((value, idx) => {
                      return <span key={idx}>{`${value}`} | </span>
                    })
                  : ''}
              </div>
              <div className="languages" />
              <div className="languages">
                <h4>
                  Codewars Completed: {`${codeWars.codewarsQuestions.length}`}
                </h4>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
)
