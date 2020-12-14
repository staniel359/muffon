import React from 'react'
import formatSeconds from 'global/functions/formatSeconds'

export default class Timer extends React.PureComponent {
  render () {
    const { currentTime, duration } = this.props

    return `${formatSeconds(currentTime)} / ${formatSeconds(duration)}`
  }
}
