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
      handleAudioEnd,
      currentTrackSource
    } = this.props

    const crossOrigin = currentTrackSource === 'soundcloud' ? 'anonymous' : null

    return (
      <audio
        autoPlay
        id="playerPanelAudio"
        loop={isRepeat}
        onLoadStart={handleLoadStart}
        onPlay={handlePlay}
        onPause={handlePause}
        onProgress={handleProgress}
        onTimeUpdate={handleTimeUpdate}
        onVolumeChange={handleVolumeChange}
        onEnded={handleAudioEnd}
        {...{ crossOrigin }}
      />
    )
  }
}
