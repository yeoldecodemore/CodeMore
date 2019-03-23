import React, {Component} from 'react'
import {connect} from 'react-redux'
import {findCodewars} from '../store/'
import {ProgressBar} from './DataVisuals/ProgressBar'
import {FaQuestionCircle} from 'react-icons/fa'

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
      this.props.findCodewars(this.props.userId)
    }

    render() {
      const {codeWars} = this.props
      const kyuLevel = codeWars.generalCodewars.overallRankName || ''
      const num = Number(kyuLevel.slice(0, 1))
      console.log(codeWars.skills)
      return (
        <div className="codewarsDisplay">
          <div>
            <ProgressBar num={num} />
          </div>
          <div className="languages">
            {codeWars.generalCodewars.skills
              ? codeWars.generalCodewars.skills.map((value, idx) => {
                  return <h2 key={idx}>{`${value}`}</h2>
                })
              : ''}
          </div>
          <div className="languages" />
          <div className="languages">
            <h2>
              <FaQuestionCircle /> Completed:{' '}
              {`${codeWars.codewarsQuestions.length}`}
            </h2>
          </div>
        </div>
      )
    }
  }
)
