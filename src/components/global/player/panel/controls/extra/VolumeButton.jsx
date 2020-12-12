import React from 'react'
import { Button, Popup, Header } from 'semantic-ui-react'

export default class VolumeButton extends React.PureComponent {
  render () {
    const { toggleMute, isMuted, volume, changeVolume } = this.props

    const volumeOffIcon = (isMuted || volume === 0) && 'volume off'
    const volumeLowIcon = volume < 50 && 'volume down'
    const volumeUpIcon = 'volume up'
    const volumeIcon = volumeOffIcon || volumeLowIcon || volumeUpIcon

    const volumeButton = (
      <Button basic compact icon={volumeIcon} onClick={toggleMute} />
    )

    const currentVolume = isMuted ? 0 : volume
    const volumeBarBackground = `
      -webkit-gradient(
        linear, left top, right top,
        color-stop(${currentVolume}%, #804FB3),
        color-stop(${currentVolume}%, #B589D6)
      )
    `
    const volumeBarStyle = { backgroundImage: volumeBarBackground }

    const volumeBar = (
      <input
        type="range"
        step="1"
        max="100"
        className="playerPanelVolumeBar"
        style={volumeBarStyle}
        value={currentVolume}
        onChange={changeVolume}
      />
    )

    const volumeCurrentValue = (
      <Header
        as="h4"
        className="playerPanelVolumeValue"
        content={currentVolume}
      />
    )

    const volumeBarData = (
      <React.Fragment>
        {volumeBar}
        {volumeCurrentValue}
      </React.Fragment>
    )

    return (
      <Popup
        basic
        hoverable
        positionFixed
        on="hover"
        position="top center"
        className="playerPanelVolumePopup"
        trigger={volumeButton}
        content={volumeBarData}
      />
    )
  }
}
