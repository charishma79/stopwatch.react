// Write your code here
import {Component} from 'react'

import './index.css'

class StopWatch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timerMinute: 0,
      timerSecond: 0,
      isTimerRunning: false,
    }
  }
  
  componentWillUnmount(){
    this.clearTimeInterval()
  }


  clearTimerInterval = () => clearInterval(this.timerId)

  onReset = () => {
    clearInterval(this.timerId)
    this.setState({timerMinute: 0, timerSecond: 0, isTimerRunning: false})
  }

  onClickStop = () => {
    this.setState({isTimerRunning: false})
    clearInterval(this.timerId)
  }

  onClickStart = () => {
    const {isTimerRunning} = this.state

    if (!isTimerRunning) {
      this.setState({isTimerRunning: true})
      this.timerId = setInterval(() => this.incrementTimer(), 1000)
    }
  }

  incrementTimer = () => {
    const {timerSecond} = this.state
    this.setState(prevState => ({
      timerSecond: prevState.timerSecond + 1,
    }))
    if (timerSecond > 58) {
      this.setState({
        timerSecond: 0,
      })
      this.setState(prevState => ({
        timerMinute: prevState.timerMinute + 1,
      }))
    }
  }

  getStringifiedTime = () => {
    const {timerMinute, timerSecond} = this.state
    const stringifiedMinutes = timerMinute > 9 ? timerMinute : `0${timerMinute}`
    const stringifiedSeconds = timerSecond > 9 ? timerSecond : `0${timerSecond}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    return (
      <div className="app-container">
        <h1 className="label">Stopwatch</h1>
        <div className="time-display-container">
          <div className="timer-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              alt="stopwatch"
              className="watch-logo"
            />
            <p className="timer">Timer</p>
          </div>
          <h1 className="timer-heading">{this.getStringifiedTime()}</h1>
          <div className="btn-container">
            <button
              className="start-btn"
              type="button"
              onClick={this.onClickStart}
              disabled={isTimerRunning}
            >
              Start
            </button>
            <button
              className="stop-btn"
              type="button"
              onClick={this.onClickStop}
            >
              Stop
            </button>
            <button className="reset-btn" type="button" onClick={this.onReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default StopWatch
