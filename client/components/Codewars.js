import React, {Component} from 'react'
import * as V from 'victory'
import {VictoryBar, VictoryTheme, VictoryChart, VictoryPolarAxis} from 'victory'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Animation from './Animation'

class Datavisual extends Component {
  constructor() {
    super()
  }
  componentDidMount() {}
  render() {
    const data = [
      {language: 'Javascript', score: 1},
      {language: 'Ruby', score: 9},
      {language: 'C++', score: 4},
      {language: 'Go', score: 8}
    ]
    return (
      <div className="grid-container">
        <div className="grid-item">
          <VictoryChart domainPadding={20}>
            <VictoryBar data={data} x="language" y="score" />
          </VictoryChart>
        </div>

        <div className="grid-item">
          <VictoryChart polar theme={VictoryTheme.material}>
            {['Javascript', 'Ruby', 'C++', 'Go'].map((d, i) => {
              return (
                <VictoryPolarAxis
                  dependentAxis
                  key={i}
                  label={d}
                  labelPlacement="perpendicular"
                  style={{tickLabels: {fill: 'none'}}}
                  axisValue={d}
                />
              )
            })}
            <VictoryBar
              style={{data: {fill: 'tomato', width: 25}}}
              data={[
                {x: 'Javascript', y: 1},
                {x: 'Ruby', y: 9},
                {x: 'C++', y: 4},
                {x: 'Go', y: 8}
              ]}
            />
          </VictoryChart>
        </div>
        <div className="grid-item">
          <Animation />
        </div>
      </div>
    )
  }
}

export default Datavisual
