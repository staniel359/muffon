import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import StopButton from './StopButton'

export default class StopButtonContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { stopAudio } = context

          const stopButtonProps = { stopAudio }

          return <StopButton {...stopButtonProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
