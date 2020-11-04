import React from 'react'
import { Container, Sidebar, Segment, List } from 'semantic-ui-react'
import { HashRouter as Router, Link } from 'react-router-dom'
import Picture from 'src/components/artists/show/Picture'
import 'styles/global/Player.sass'
import PlayerContext from 'contexts/PlayerContext'
import AudioContainer from './audio/AudioContainer'
import Controls from './audio/Controls'
import TimeBar from './audio/TimeBar'

export default class Panel extends React.Component {
  static contextType = PlayerContext

  playerPanelContainer () {
    return (
      <Container className="playerPanelContainer">
        <div className="playerPanelLeftColumn">{this.trackData()}</div>

        <div className="playerPanelRightColumn">
          <AudioContainer />

          {this.context.playingNowTrack && this.controlsTimeBarData()}
        </div>
      </Container>
    )
  }

  trackData () {
    return (
      <Router>
        <List className="playerPanelTrackWrap">
          <List.Item>
            <div className="imageWrap">
              <Picture
                artistName={this.context.playingNowTrack.artist}
                dimmer
              />
            </div>

            {this.trackDataContent()}
          </List.Item>
        </List>
      </Router>
    )
  }

  trackDataContent () {
    return (
      <List.Content className="contentWrap">
        <List.Header as="h4">
          <Link to={this.trackLink()}>
            {this.context.playingNowTrack.title}
          </Link>
        </List.Header>

        <List.Description>
          <Link to={this.artistLink()}>
            {this.context.playingNowTrack.artist}
          </Link>
        </List.Description>
      </List.Content>
    )
  }

  trackLink () {
    return `/artists/${this.artistName()}/tracks/${this.trackTitle()}`
  }

  artistName () {
    return encodeURIComponent(this.context.playingNowTrack.artist)
  }

  trackTitle () {
    return encodeURIComponent(this.context.playingNowTrack.title)
  }

  artistLink () {
    return `/artists/${this.artistName()}`
  }

  controlsTimeBarData () {
    return (
      <React.Fragment>
        <Controls />

        <TimeBar />
      </React.Fragment>
    )
  }

  render () {
    return (
      <Sidebar
        as={Segment}
        visible={!!this.context.playingNowTrack}
        direction="bottom"
        animation="overlay"
        className="playerPanel"
      >
        {this.context.playingNowTrack && this.playerPanelContainer()}
      </Sidebar>
    )
  }
}
