import React from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'
import Picture from 'src/components/artists/show/Picture'
import PlayerContext from 'contexts/PlayerContext'

export default class Track extends React.Component {
  static contextType = PlayerContext

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

  render () {
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
          </List.Item>
        </List>
      </Router>
    )
  }
}
