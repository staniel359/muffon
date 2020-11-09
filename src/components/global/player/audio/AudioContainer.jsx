import React from 'react'
import PlayerContext from 'contexts/PlayerContext'

export default class AudioContainer extends React.PureComponent {
  static contextType = PlayerContext

  render () {
    const {
      repeat,
      handleLoadStart,
      handleProgress,
      handleTimeUpdate,
      handleVolumeChange,
      handleAudioEnd
    } = this.context

    return (
      <audio
        id="playerPanelAudio"
        autoPlay
        loop={repeat}
        onLoadStart={handleLoadStart}
        onProgress={handleProgress}
        onTimeUpdate={handleTimeUpdate}
        onVolumeChange={handleVolumeChange}
        onEnded={handleAudioEnd}
      />
    )
  }
}
