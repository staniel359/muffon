import React from 'react'

export default class Timer extends React.PureComponent {
  render () {
    const { currentTime, duration } = this.props

    const format = seconds =>
      new Date(seconds * 1000).toISOString().substr(14, 5)

    return `${format(currentTime)} / ${format(duration)}`
  }
}
