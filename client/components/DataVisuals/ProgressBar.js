import React, {Component} from 'react'
import {VictoryPie, VictoryAnimation, VictoryLabel} from 'victory'
import {connect} from 'react-redux'

const mapStateToProps = ({codewarReducer, userReducer}) => ({
  userId: userReducer.id,
  codeWars: codewarReducer
})

const mapDispatchToProps = dispatch => ({
  findCodewars: id => dispatch(findCodewars(id))
})

export const ProgressBar = connect(mapStateToProps, mapDispatchToProps)(
  class ProgressBar extends Component {
    constructor(props) {
      super(props)
      this.state = {
        num: this.props.codeWars.generalCodewars.id,
        data: this.getData(0)
      }
    }

    componentDidMount() {
      const num = this.props.codeWars.generalCodewars.id
      this.setStateInterval = window.setInterval(() => {
        this.setState({
          num,
          data: this.getData(num)
        })
      }, 2000)
    }

    componentWillUnmount() {
      window.clearInterval(this.setStateInterval)
    }

    getData(num) {
      return [{x: 1, y: num}, {x: 2, y: 10 - num}]
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
              text={this.state.num}
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
                    text={`${Math.floor(newProps.num)} kyu`}
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
)
