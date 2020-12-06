import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import MainControls from './Main'

export default class MainContextWrap extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const {
            isShuffle,
            toggleShuffle,
            toggleAudio,
            audioStatus,
            isRepeat,
            toggleRepeat
          } = context
          const mainControlsProps = {
            isShuffle,
            toggleShuffle,
            toggleAudio,
            audioStatus,
            isRepeat,
            toggleRepeat
          }

          return <MainControls {...mainControlsProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
