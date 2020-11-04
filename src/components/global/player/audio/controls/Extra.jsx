import React from 'react'
import { Button, Popup, Header } from 'semantic-ui-react'
import PlayerContext from 'contexts/PlayerContext'

export default class Extra extends React.Component {
  static contextType = PlayerContext

  controlsData () {
    return (
      <React.Fragment>
        {this.volumeButtonWithBar()}

        {this.stopAudioButton()}
      </React.Fragment>
    )
  }

  volumeButtonWithBar () {
    return (
      <Popup
        trigger={this.volumeButton()}
        content={this.volumeButtonWithBarData()}
        className="playerPanelVolumePopup"
        position="top center"
        on="hover"
        positionFixed
        hoverable
        basic
      />
    )
  }

  volumeButton () {
    return (
      <Button
        basic
        onClick={this.context.toggleMute}
        icon={this.volumeButtonIcon()}
      />
    )
  }

  volumeButtonIcon () {
    const muted = this.context.muted
    const volumeOff = this.context.volume === 0
    const volumeLow = this.context.volume <= 50

    if (muted || volumeOff) {
      return 'volume off'
    } else if (volumeLow) {
      return 'volume down'
    } else {
      return 'volume up'
    }
  }

  volumeButtonWithBarData () {
    return (
      <React.Fragment>
        {this.volumeBar()}

        <Header
          as="h4"
          className="playerPanelVolumeValue"
          content={this.currentVolume()}
        />
      </React.Fragment>
    )
  }

  volumeBar () {
    return (
      <input
        type="range"
        step="1"
        max="100"
        className="playerPanelVolumeBar"
        style={this.volumeBarStyle()}
        value={this.currentVolume()}
        onChange={this.context.changeVolume}
      />
    )
  }

  volumeBarStyle () {
    return { backgroundImage: this.volumeBarBackground() }
  }

  volumeBarBackground () {
    return `
      -webkit-gradient(
        linear, left top, right top,
        color-stop(${this.currentVolume()}%, #804FB3),
        color-stop(${this.currentVolume()}%, #B589D6)
      )
    `
  }

  currentVolume () {
    return this.context.muted ? 0 : this.context.volume
  }

  stopAudioButton () {
    return (
      <Button basic size="tiny" onClick={this.context.stopAudio} icon="times" />
    )
  }

  render () {
    return this.controlsData()
  }
}
