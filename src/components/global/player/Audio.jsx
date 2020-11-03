import React from 'react'
import Container from './audio/Container'
import Controls from './audio/Controls'
import TimeBar from './audio/TimeBar'
import { connect } from 'react-redux'
import * as playerActions from 'src/redux/actions/player'

class Audio extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      percentLoaded: 0,
      currentTime: 0,
      currentVolume: 1,
      muted: false,
      shuffle: false,
      repeat: false
    }
  }

  containerProps () {
    const { repeat } = this.state
    const {
      handleLoadStart,
      handleProgress,
      handleTimeUpdate,
      handleAudioEnd
    } = this

    return {
      repeat,
      handleLoadStart,
      handleProgress,
      handleTimeUpdate,
      handleAudioEnd
    }
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

  handleAudioEnd = () => {
    this.audio().currentTime = 0
    this.props.pauseAudio()
  }

  controlsProps () {
    const duration = this.audio().duration
    const { currentTime, shuffle, repeat, muted, currentVolume } = this.state
    const { audioStatus, stopAudio } = this.props
    const {
      toggleShuffle,
      toggleAudio,
      toggleRepeat,
      toggleMute,
      handleVolumeChange
    } = this

    return {
      duration,
      currentTime,
      shuffle,
      repeat,
      muted,
      currentVolume,
      audioStatus,
      stopAudio,
      toggleShuffle,
      toggleAudio,
      toggleRepeat,
      toggleMute,
      handleVolumeChange
    }
  }

  toggleShuffle = () => {
    this.setState({ shuffle: !this.state.shuffle })
  }

  toggleAudio = () => {
    this.toggleAudioActions[this.props.audioStatus]()
  }

  toggleAudioActions = {
    play: this.props.pauseAudio,
    pause: this.props.unpauseAudio
  }

  toggleRepeat = () => {
    this.setState({ repeat: !this.state.repeat })
  }

  toggleMute = () => {
    const mutedValue = !this.state.muted

    this.setState({ muted: mutedValue })
    this.audio().muted = mutedValue
  }

  handleVolumeChange = e => {
    const currentVolume = e.target.value

    this.setState({ currentVolume: currentVolume })
    this.audio().volume = currentVolume
    this.changeMute(currentVolume === '0')
  }

  changeMute = bool => {
    this.setState({ muted: bool })
    this.audio().muted = bool
  }

  timeBarProps () {
    const duration = this.audio().duration
    const { percentLoaded, currentTime } = this.state
    const {
      handleAudioBarTimeChange,
      handleAudioBarSelectStart,
      handleAudioBarSelectEnd
    } = this

    return {
      duration,
      percentLoaded,
      currentTime,
      handleAudioBarTimeChange,
      handleAudioBarSelectStart,
      handleAudioBarSelectEnd
    }
  }

  handleAudioBarTimeChange = e => {
    this.setState({ currentTime: e.target.value })
  }

  handleAudioBarSelectStart = () => {
    this.audio().pause()
  }

  handleAudioBarSelectEnd = () => {
    this.audio().currentTime = this.state.currentTime
    this.audio()[this.props.audioStatus]()
  }

  render () {
    return (
      <React.Fragment>
        <Container {...this.containerProps()} />

        {this.audio() && <Controls {...this.controlsProps()} />}

        {this.audio() && <TimeBar {...this.timeBarProps()} />}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, playerActions)(Audio)
