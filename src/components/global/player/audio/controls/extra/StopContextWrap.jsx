import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import StopButton from './Stop'

export default class StopContextWrap extends React.PureComponent {
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
