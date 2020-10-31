import React from 'react'
import { connect } from 'react-redux'
import {
  pauseAudio,
  unpauseAudio,
  stopAudio
} from '../../../redux/actions/main'
import { Button, Popup, Grid } from 'semantic-ui-react'

class Audio extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      percentLoaded: 0,
      currentTime: 0,
      currentVolume: 1,
      muted: false
    }
  }

  audioContainer () {
    return (
      <audio
        autoPlay
        id="playerPanelAudio"
        onLoadStart={this.handleLoadStart}
        onProgress={this.handleProgress}
        onTimeUpdate={this.handleTimeUpdate}
      />
    )
  }

  handleLoadStart = () => {
    this.setState({ percentLoaded: 0 })
  }

  handleProgress = () => {
    this.setState({ percentLoaded: this.percentLoaded() })
  }

  percentLoaded () {
    const loaded = this.audio().buffered
    const indexLoaded = loaded.length - 1
    const secondsLoaded = loaded.end(indexLoaded)
    const duration = this.audio().duration

    return (secondsLoaded / duration) * 100
  }

  audio () {
    return document.getElementById('playerPanelAudio')
  }

  handleTimeUpdate = () => {
    this.setState({ currentTime: this.audio().currentTime })
  }

  audioControls () {
    return (
      <Grid columns={3} verticalAlign="middle">
        <Grid.Column textAlign="left">{this.audioTimer()}</Grid.Column>

        <Grid.Column textAlign="center">
          <Button basic size="tiny" icon="backward" />

          {this.toggleAudioButton()}

          <Button basic size="tiny" icon="forward" />
        </Grid.Column>

        <Grid.Column textAlign="right">
          {this.volumeButtonWithBar()}

          {this.stopAudioButton()}
        </Grid.Column>
      </Grid>
    )
  }

  toggleAudioButton () {
    return (
      <Button
        basic
        onClick={this.toggleAudio}
        icon={this.toggleAudioButtonIcon()}
      />
    )
  }

  toggleAudio = () => {
    if (this.props.audioStatus === 'play') {
      this.props.pauseAudio()
    } else if (this.props.audioStatus === 'pause') {
      this.props.unpauseAudio()
    }
  }

  toggleAudioButtonIcon () {
    return this.toggleAudioButtonIcons[this.props.audioStatus]
  }

  toggleAudioButtonIcons = {
    play: 'pause',
    pause: 'play'
  }

  stopAudioButton () {
    return (
      <Button basic size="tiny" onClick={this.props.stopAudio} icon="times" />
    )
  }

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
      <Button basic onClick={this.toggleMute} icon={this.volumeButtonIcon()} />
    )
  }

  toggleMute = () => {
    this.setState({ muted: !this.state.muted })
    this.audio().muted = !this.state.muted
  }

  volumeButtonIcon () {
    if (this.state.muted) {
      return 'volume off'
    } else {
      if (this.state.currentVolume <= 0.5) {
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
        onChange={this.handleVolumeChange}
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
    return this.state.muted ? 0 : this.state.currentVolume
  }

  handleVolumeChange = e => {
    const currentVolume = e.target.value

    this.setState({ currentVolume: currentVolume })
    this.audio().volume = currentVolume
    this.changeMute(e.target.value === '0')
  }

  changeMute = bool => {
    this.setState({ muted: bool })
    this.audio().muted = bool
  }

  audioTimer () {
    return `${this.currentTime()} / ${this.duration()}`
  }

  currentTime () {
    return this.formatSeconds(this.state.currentTime)
  }

  formatSeconds (seconds) {
    return new Date(seconds * 1000).toISOString().substr(14, 5)
  }

  duration () {
    return this.formatSeconds(this.audio().duration || 0)
  }

  audioBar () {
    return (
      <div className="playerPanelAudioWrap">
        <div className="playerPanelBar playerPanelBackgroundBar" />

        <div
          className="playerPanelBar playerPanelLoaderBar"
          style={this.audioLoaderStyle()}
        />

        {this.audioBarSlider()}
      </div>
    )
  }

  audioLoaderStyle () {
    return { width: `${this.state.percentLoaded}%` }
  }

  audioBarSlider () {
    return (
      <input
        type="range"
        step="1"
        max={this.audio().duration || 0}
        value={this.state.currentTime}
        className="playerPanelBar playerPanelAudioBar"
        style={this.audioBarStyle()}
        onChange={this.handleAudioBarTimeChange}
        onMouseDown={this.handleAudioBarSelectStart}
        onMouseUp={this.handleAudioBarSelectEnd}
      />
    )
  }

  audioBarStyle () {
    return { backgroundImage: this.audioBarBackground() }
  }

  audioBarBackground () {
    const percent = this.percentPlayed() || 0
    return `
      -webkit-gradient(
        linear, left top, right top,
        color-stop(${percent}%, #804FB3),
        color-stop(${percent}%, transparent)
      )
    `
  }

  percentPlayed () {
    return (this.audio().currentTime / this.audio().duration) * 100
  }

  handleAudioBarTimeChange = e => {
    this.setState({ currentTime: e.target.value })
  }

  handleAudioBarSelectStart = () => {
    this.audio().pause()
  }

  handleAudioBarSelectEnd = () => {
    this.audio().currentTime = this.state.currentTime

    if (this.props.audioStatus === 'play') {
      this.audio().play()
    } else if (this.props.audioStatus === 'pause') {
      this.audio().pause()
    }
  }

  render () {
    return (
      <React.Fragment>
        {this.audioContainer()}

        {this.audio() && this.audioControls()}

        {this.audio() && this.audioBar()}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, {
  pauseAudio,
  unpauseAudio,
  stopAudio
})(Audio)
