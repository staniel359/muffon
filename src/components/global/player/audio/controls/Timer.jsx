import React from 'react'
import PlayerContext from 'contexts/PlayerContext'

export default class Timer extends React.Component {
  static contextType = PlayerContext

  timerData () {
    return `${this.currentTime()} / ${this.duration()}`
  }

  currentTime () {
    return this.formatSeconds(this.context.currentTime)
  }

  formatSeconds (seconds) {
    return new Date(seconds * 1000).toISOString().substr(14, 5)
  }

  duration () {
    return this.formatSeconds(this.context.duration)
  }

  render () {
    return this.timerData()
  }
}
