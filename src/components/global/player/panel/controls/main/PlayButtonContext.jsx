import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import PlayButton from './PlayButton'

export default class PlayButtonContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { toggleAudio, audioStatus } = context

          const playButtonProps = { toggleAudio, audioStatus }

          return <PlayButton {...playButtonProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
