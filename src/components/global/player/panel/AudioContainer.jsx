import React from 'react'

export default class AudioContainer extends React.PureComponent {
  render () {
    const {
      isRepeat,
      handleLoadStart,
      handlePlay,
      handlePause,
      handleProgress,
      handleTimeUpdate,
      handleVolumeChange,
      handleAudioEnd
    } = this.props

    return (
      <audio
        id="playerPanelAudio"
        autoPlay
        loop={isRepeat}
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
