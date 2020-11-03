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
      currentTime: 0
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

        {this.audio() && <Controls />}

        {this.audio() && <TimeBar {...this.timeBarProps()} />}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, playerActions)(Audio)
