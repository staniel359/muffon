import React from 'react'
import formatSeconds from 'global/functions/formatSeconds'

export default class Timer extends React.PureComponent {
  render () {
    const { currentTime, duration } = this.props

    const current = formatSeconds(currentTime)
    const total = formatSeconds(duration)

    return <div className="playerPanelTimer">{`${current} / ${total}`}</div>
  }
}
