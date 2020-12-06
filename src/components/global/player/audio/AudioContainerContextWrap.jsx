import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import AudioContainer from './AudioContainer'

export default class AudioContainerContextWrap extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const {
            isRepeat,
            handleLoadStart,
            handlePlay,
            handlePause,
            handleProgress,
            handleTimeUpdate,
            handleVolumeChange,
            handleAudioEnd
          } = context
          const audioContainerProps = {
            isRepeat,
            handleLoadStart,
            handlePlay,
            handlePause,
            handleProgress,
            handleTimeUpdate,
            handleVolumeChange,
            handleAudioEnd
          }

          return <AudioContainer {...audioContainerProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
