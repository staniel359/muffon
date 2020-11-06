import React from 'react'
import { Button, Popup, Header } from 'semantic-ui-react'
import PlayerContext from 'contexts/PlayerContext'
import ChangeTrackButton from '../../buttons/ChangeTrack'

export default class Extra extends React.Component {
  static contextType = PlayerContext

  volumeButtonWithBar () {
    return (
      <Popup
        basic
        hoverable
        positionFixed
        on="hover"
        position="top center"
        className="playerPanelVolumePopup"
        trigger={this.volumeButton()}
        content={this.volumeButtonWithBarData()}
      />
    )
  }

  volumeButton () {
    return (
      <Button
        basic
        compact
        icon={this.volumeButtonIcon()}
        onClick={this.context.toggleMute}
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

  changeTrackButtonWithPopup () {
    return (
      <Popup
        inverted
        positionFixed
        on="hover"
        position="top center"
        content="Wrong track? Next"
        className="playerPanelExtraPopup"
        trigger={<ChangeTrackButton />}
      />
    )
  }

  stopAudioButtonWithPopup () {
    return (
      <Popup
        inverted
        positionFixed
        on="hover"
        position="top center"
        content="Stop and close"
        className="playerPanelExtraPopup"
        trigger={this.stopAudioButton()}
      />
    )
  }

  stopAudioButton () {
    return (
      <Button
        basic
        compact
        size="mini"
        icon="times"
        onClick={this.context.stopAudio}
      />
    )
  }

  render () {
    return (
      <React.Fragment>
        {this.volumeButtonWithBar()}

        {this.changeTrackButtonWithPopup()}

        {this.stopAudioButtonWithPopup()}
      </React.Fragment>
    )
  }
}
