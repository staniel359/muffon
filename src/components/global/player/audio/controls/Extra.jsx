import React from 'react'
import { Button, Popup, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { stopAudio } from 'src/redux/actions/player'

class Extra extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      volume: 100,
      muted: false
    }
  }

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
        className="playerPanelVolumePopup"
        position="top center"
        on="hover"
        positionFixed
        hoverable
        basic
      >
        {this.volumeBar()}

        <Header
          as="h4"
          className="playerPanelVolumeValue"
          content={this.currentVolume()}
        />
      </Popup>
    )
  }

  volumeButton () {
    return (
      <Button basic onClick={this.toggleMute} icon={this.volumeButtonIcon()} />
    )
  }

  toggleMute = () => {
    const mutedValue = !this.state.muted

    this.setState({ muted: mutedValue })
    this.audio.muted = mutedValue
  }

  audio = document.getElementById('playerPanelAudio')

  volumeButtonIcon () {
    const muted = this.state.muted
    const volumeOff = this.state.volume === 0
    const volumeLow = this.state.volume <= 50

    if (muted || volumeOff) {
      return 'volume off'
    } else if (volumeLow) {
      return 'volume down'
    } else {
      return 'volume up'
    }
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
        onChange={this.handleVolumeChange}
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
    return this.state.muted ? 0 : this.state.volume
  }

  handleVolumeChange = e => {
    const volume = parseInt(e.target.value)
    const muted = volume === 0

    this.setState({ volume: volume, muted: muted })

    this.audio.volume = volume / 100
    this.audio.muted = muted
  }

  stopAudioButton () {
    return (
      <Button basic size="tiny" onClick={this.props.stopAudio} icon="times" />
    )
  }

  render () {
    return this.controlsData()
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, { stopAudio })(Extra)
