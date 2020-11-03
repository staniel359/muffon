import React from 'react'
import { Container, Sidebar, Segment, List } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Audio from './Audio'
import { HashRouter as Router, Link } from 'react-router-dom'
import Picture from 'src/components/artists/show/Picture'
import 'styles/global/Player.sass'

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
          <Router>
            <List className="playerPanelTrackWrap">
              <List.Item>
                <div className="imageWrap">
                  <Picture artistName={this.state.playingNowTrack.artist} />
                </div>

                <List.Content className="contentWrap">
                  <List.Header as="h4">
                    <Link to={this.trackLink()}>
                      {this.state.playingNowTrack.title}
                    </Link>
                  </List.Header>

                  <List.Description>
                    <Link to={this.artistLink()}>
                      {this.state.playingNowTrack.artist}
                    </Link>
                  </List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Router>
        </div>

        <div className="playerPanelRightColumn">
          <Audio />
        </div>
      </Container>
    )
  }

  trackLink () {
    return `/artists/${this.artistName()}/tracks/${this.trackTitle()}`
  }

  artistName () {
    return encodeURIComponent(this.state.playingNowTrack.artist)
  }

  trackTitle () {
    return encodeURIComponent(this.state.playingNowTrack.title)
  }

  artistLink () {
    return `/artists/${this.artistName()}`
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
