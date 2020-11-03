import React from 'react'

export default class Timer extends React.Component {
  timerData () {
    return `${this.currentTime()} / ${this.duration()}`
  }

  currentTime () {
    return this.formatSeconds(this.audio.currentTime)
  }

  audio = document.getElementById('playerPanelAudio')

  formatSeconds (seconds) {
    return new Date(seconds * 1000).toISOString().substr(14, 5)
  }

  duration () {
    return this.formatSeconds(this.audio.duration || 0)
  }

  render () {
    return this.timerData()
  }
}
