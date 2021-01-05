import React from 'react'
import Timer from './Timer'
import PlayerContext from 'contexts/PlayerContext'

export default class TimerContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { currentTime, duration } = context

          const timerProps = { currentTime, duration }

          return <Timer {...timerProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
