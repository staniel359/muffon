import React from 'react'
import { Container, Sidebar, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Audio from './Audio'

class Panel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props !== prevProps) {
      this.handleComponentUpdate()
    }
  }

  handleComponentUpdate () {
    this.handleAudioStop()
    this.setPlayingNowTrack()
    this.toggleAudio()
  }

  handleAudioStop () {
    if (this.props.audioStatus === 'stop') {
      this.setState({ playingNowTrack: null })
    }
  }

  setPlayingNowTrack () {
    if (this.props.playingNowTrack) {
      this.setState(
        { playingNowTrack: this.props.playingNowTrack },
        this.setAudioLink
      )
    }
  }

  setAudioLink () {
    this.audio().src = this.state.playingNowTrack.link
  }

  audio () {
    return document.getElementById('playerPanelAudio')
  }

  toggleAudio () {
    if (this.state.playingNowTrack) {
      if (this.props.audioStatus === 'play') {
        this.audio().play()
      } else if (this.props.audioStatus === 'pause') {
        this.audio().pause()
      }
    }
  }

  playerPanelContainer () {
    return (
      <Container className="playerPanelContainer">
        <div className="playerPanelLeftColumn">
          {this.state.playingNowTrack.title}
          <br />
          {this.state.playingNowTrack.artist}
        </div>

        <div className="playerPanelRightColumn">
          <Audio />
        </div>
      </Container>
    )
  }

  render () {
    return (
      <Sidebar
        as={Segment}
        visible={!!this.state.playingNowTrack}
        direction="bottom"
        animation="overlay"
        className="playerPanel"
      >
        {this.state.playingNowTrack && this.playerPanelContainer()}
      </Sidebar>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(Panel)
