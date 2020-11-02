import React from 'react'
import { Button, Popup } from 'semantic-ui-react'

export default class Extra extends React.Component {
  volumeButtonWithBar () {
    return (
      <Popup
        size="tiny"
        position="top center"
        on="hover"
        positionFixed
        hoverable
        basic
        trigger={this.volumeButton()}
        content={this.volumeBar()}
      />
    )
  }

  volumeButton () {
    return (
      <Button
        basic
        onClick={this.props.toggleMute}
        icon={this.volumeButtonIcon()}
      />
    )
  }

  volumeButtonIcon () {
    if (this.props.muted) {
      return 'volume off'
    } else {
      if (this.props.currentVolume <= 0.5) {
        return 'volume down'
      } else {
        return 'volume up'
      }
    }
  }

  volumeBar () {
    return (
      <input
        type="range"
        step="0.01"
        max="1"
        className="playerPanelBar"
        style={this.volumeBarStyle()}
        value={this.currentVolume()}
        onChange={this.props.handleVolumeChange}
      />
    )
  }

  volumeBarStyle () {
    return { backgroundImage: this.volumeBarBackground() }
  }

  volumeBarBackground () {
    const percent = this.currentVolume() * 100
    return `
      -webkit-gradient(
        linear, left top, right top,
        color-stop(${percent}%, #804FB3),
        color-stop(${percent}%, #B589D6)
      )
    `
  }

  currentVolume () {
    return this.props.muted ? 0 : this.props.currentVolume
  }

  stopAudioButton () {
    return (
      <Button basic size="tiny" onClick={this.props.stopAudio} icon="times" />
    )
  }

  render () {
    return (
      <React.Fragment>
        {this.volumeButtonWithBar()}

        {this.stopAudioButton()}
      </React.Fragment>
    )
  }
}
