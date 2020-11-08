import React from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'
import Picture from 'global/artists/Picture'
import Ticker from 'partials/Ticker'
import { v4 as uuid } from 'uuid'

export default class Track extends React.PureComponent {
  trackLink () {
    return `/artists/${this.artistName()}/tracks/${this.trackTitle()}`
  }

  artistName () {
    return encodeURIComponent(this.props.currentTrack.artist)
  }

  trackTitle () {
    return encodeURIComponent(this.props.currentTrack.title)
  }

  artistLink () {
    return `/artists/${this.artistName()}`
  }

  render () {
    return (
      <Router>
        <List className="playerPanelTrackWrap">
          <List.Item>
            <div className="playerPanelTrackImage">
              <Picture artistName={this.props.currentTrack.artist} />
            </div>

            <List.Content className="playerPanelTrackContent">
              <List.Header as="h4">
                <Link to={this.trackLink()}>
                  <Ticker key={uuid()}>{this.props.currentTrack.title}</Ticker>
                </Link>
              </List.Header>

              <List.Description>
                <Link to={this.artistLink()}>
                  <Ticker key={uuid()}>{this.props.currentTrack.artist}</Ticker>
                </Link>
              </List.Description>
            </List.Content>
          </List.Item>
        </List>
      </Router>
    )
  }
}
