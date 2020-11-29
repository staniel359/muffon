import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import MainControls from './Main'

export default class MainContextWrap extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const {
            shuffle,
            toggleShuffle,
            toggleAudio,
            audioStatus,
            repeat,
            toggleRepeat
          } = context
          const mainControlsProps = {
            shuffle,
            toggleShuffle,
            toggleAudio,
            audioStatus,
            repeat,
            toggleRepeat
          }

          return <MainControls {...mainControlsProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
