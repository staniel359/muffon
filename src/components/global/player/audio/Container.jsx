import React from 'react'

export default class Container extends React.Component {
  render () {
    return (
      <audio
        autoPlay
        loop={this.props.repeat}
        id="playerPanelAudio"
        onLoadStart={this.props.handleLoadStart}
        onProgress={this.props.handleProgress}
        onTimeUpdate={this.props.handleTimeUpdate}
        onEnded={this.props.handleAudioEnd}
      />
    )
  }
}
