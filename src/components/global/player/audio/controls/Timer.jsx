import React from 'react'

export default class Timer extends React.Component {
  currentTime () {
    return this.formatSeconds(this.props.currentTime)
  }

  formatSeconds (seconds) {
    return new Date(seconds * 1000).toISOString().substr(14, 5)
  }

  duration () {
    return this.formatSeconds(this.props.duration || 0)
  }

  render () {
    return `${this.currentTime()} / ${this.duration()}`
  }
}
