import React from 'react'
import PlayerContext from 'contexts/PlayerContext'

export default class AudioContainer extends React.PureComponent {
  static contextType = PlayerContext

  render () {
    const {
      repeat,
      handleLoadStart,
      handlePlay,
      handlePause,
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
        onPlay={handlePlay}
        onPause={handlePause}
        onProgress={handleProgress}
        onTimeUpdate={handleTimeUpdate}
        onVolumeChange={handleVolumeChange}
        onEnded={handleAudioEnd}
      />
    )
  }
}
