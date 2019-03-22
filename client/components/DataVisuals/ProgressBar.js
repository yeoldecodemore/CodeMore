import React, {Component} from 'react'
import {VictoryPie, VictoryAnimation, VictoryLabel} from 'victory'

export default class ProgressBar extends Component {
  constructor() {
    super()
    this.state = {
      num: 0
    }
  }

  componentDidMount() {
    let num = 25

    this.setState({
      num
    })
  }

  render() {
    const {num} = this.props.state || 0
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
            <VictoryLabel
              textAnchor="middle"
              verticalAnchor="middle"
              x={200}
              y={200}
              text={`${num}`}
              style={{fontSize: 45}}
            />
          </VictoryAnimation>
        </svg>
      </div>
    )
  }
}
