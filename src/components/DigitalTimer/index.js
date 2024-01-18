// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timerElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 0) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timerElapsedInSeconds} = this.state
    const isButtonDisabled = timerElapsedInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label">Set Timer Limit</p>
        <div className="time-limit-controller">
          <button
            type="button"
            className="limit-controller-button"
            disabled={isButtonDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timerLimitInMinutes}</p>
          </div>
          <button
            className="limit-controller-button"
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimerElapsedInSeconds = () => {
    const {timerLimitInMinutes, timerElapsedInSeconds} = this.state
    const isTimerCompleted = timerElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerElapsedInSeconds: prevState.timerElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timerElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state

    const isTimerCompleted = timerElapsedInSeconds === timerLimitInMinutes * 60
    if (isTimerCompleted) {
      this.setState({timerElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimerElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          className="timer-controller-button"
          onClick={this.onStartOrPauseTimer}
          type="button"
        >
          <img
            alt={startOrPauseAltText}
            className="timer-controller-icon"
            src={startOrPauseImageUrl}
          />
          <p className="timer-controller-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="timer-controller-button"
          onClick={this.onResetTimer}
          type="button"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            className="timer-controller-icon"
            alt="reset icon"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerElapsedInSeconds, timerLimitInMinutes} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timerElapsedInSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-timer-container">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
