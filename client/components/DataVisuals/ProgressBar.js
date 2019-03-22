import React, {Component} from 'react'
import {VictoryPie, VictoryAnimation, VictoryLabel} from 'victory'

class Animation extends Component {
  constructor() {
    super()
    this.state = {
      percent: 25,
      data: this.getData(0)
    }
  }

  componentDidMount() {
    let rank = 25

    this.setState({
      percent,
      data: this.getData(percent)
    })
  }

  getData(percent) {
    return [{x: 1, y: percent}, {x: 2, y: 100 - percent}]
  }

  render() {
    return (
      <div>
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          <VictoryPie
            standalone={false}
            animate={{duration: 1000}}
            width={400}
            height={400}
            data={this.state.data}
            innerRadius={120}
            cornerRadius={25}
            labels={() => null}
            style={{
              data: {
                fill: d => {
                  const color = d.y > 30 ? 'green' : 'red'
                  return d.x === 1 ? color : 'transparent'
                }
              }
            }}
          />
          <VictoryAnimation duration={1000} data={this.state}>
            {newProps => {
              return (
                <VictoryLabel
                  textAnchor="middle"
                  verticalAnchor="middle"
                  x={200}
                  y={200}
                  text={`${newProps.percent}%`}
                  style={{fontSize: 45}}
                />
              )
            }}
          </VictoryAnimation>
        </svg>
      </div>
    )
  }
}

module.exports = Animation
