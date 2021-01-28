import React from 'react'
import { Button, Popup, Header } from 'semantic-ui-react'

export default class VolumeButton extends React.PureComponent {
  buttonData () {
    const { toggleMute } = this.props

    return (
      <Button
        basic
        compact
        size="tiny"
        icon={this.volumeIconData()}
        onClick={toggleMute}
      />
    )
  }

  volumeIconData () {
    const { isMuted, volume } = this.props

    if (isMuted || volume === 0) {
      return 'volume off'
    } else if (volume < 50) {
      return 'volume down'
    } else {
      return 'volume up'
    }
  }

  volumeBarData () {
    const volumeCurrentValue = (
      <Header
        as="h4"
        className="playerPanelVolumeValue"
        content={this.currentVolume()}
      />
    )

    return (
      <React.Fragment>
        {this.volumeBar()}
        {volumeCurrentValue}
      </React.Fragment>
    )
  }

  volumeBar () {
    const { changeVolume } = this.props

    const volumeBarBackground = `
      -webkit-gradient(
        linear, left top, right top,
        color-stop(${this.currentVolume()}%, #804FB3),
        color-stop(${this.currentVolume()}%, #B589D6)
      )
    `
    const volumeBarStyle = { backgroundImage: volumeBarBackground }

    return (
      <input
        type="range"
        step="1"
        max="100"
        className="playerPanelVolumeBar"
        style={volumeBarStyle}
        value={this.currentVolume()}
        onChange={changeVolume}
      />
    )
  }

  currentVolume () {
    const { isMuted, volume } = this.props

    return isMuted ? 0 : volume
  }

  render () {
    return (
      <Popup
        basic
        hoverable
        positionFixed
        on="hover"
        position="top center"
        className="playerPanelVolumePopup"
        trigger={this.buttonData()}
        content={this.volumeBarData()}
      />
    )
  }
}
