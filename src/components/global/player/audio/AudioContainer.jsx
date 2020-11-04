import React from 'react'
import PlayerContext from 'contexts/PlayerContext'

export default class AudioContainer extends React.Component {
  static contextType = PlayerContext
  render () {
    return (
      <audio
        id="playerPanelAudio"
        autoPlay
        loop={this.context.repeat}
        onLoadStart={this.context.handleLoadStart}
        onProgress={this.context.handleProgress}
        onTimeUpdate={this.context.handleTimeUpdate}
        onVolumeChange={this.context.handleVolumeChange}
        onEnded={this.context.handleAudioEnd}
      />
    )
  }
}
