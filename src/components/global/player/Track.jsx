import React from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'
import Picture from 'global/artists/Picture'
import Ticker from 'partials/Ticker'
import { v4 as uuid } from 'uuid'

export default class Track extends React.PureComponent {
  render () {
    const { artist, title } = this.props.currentTrack

    const artistNameEncoded = encodeURIComponent(artist)
    const trackTitleEncoded = encodeURIComponent(title)

    const trackLink = `/artists/${artistNameEncoded}/tracks/${trackTitleEncoded}`

    const artistLink = `/artists/${artistNameEncoded}`

    return (
      <Router>
        <List className="playerPanelTrackWrap">
          <List.Item>
            <div className="playerPanelTrackImage">
              <Picture artistName={artist} />
            </div>

            <List.Content className="playerPanelTrackContent">
              <List.Header as="h4">
                <Link to={trackLink}>
                  <Ticker key={uuid()}>{title}</Ticker>
                </Link>
              </List.Header>

              <List.Description>
                <Link to={artistLink}>
                  <Ticker key={uuid()}>{artist}</Ticker>
                </Link>
              </List.Description>
            </List.Content>
          </List.Item>
        </List>
      </Router>
    )
  }
}
