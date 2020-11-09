import React from 'react'
import PlayerContext from 'contexts/PlayerContext'

export default class Timer extends React.PureComponent {
  static contextType = PlayerContext

  format (seconds) {
    return new Date(seconds * 1000).toISOString().substr(14, 5)
  }

  render () {
    const currentTime = this.format(this.context.currentTime)
    const duration = this.format(this.context.duration)

    return `${currentTime} / ${duration}`
  }
}
