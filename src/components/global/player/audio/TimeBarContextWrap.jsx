import React from 'react'
import TimeBar from './TimeBar'
import PlayerContext from 'contexts/PlayerContext'

export default class TimeBarContextWrap extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const {
            secondsLoaded,
            duration,
            currentTime,
            changeTime,
            startTimeChange,
            endTimeChange
          } = context
          const timeBarProps = {
            secondsLoaded,
            duration,
            currentTime,
            changeTime,
            startTimeChange,
            endTimeChange
          }

          return <TimeBar {...timeBarProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
