import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { List } from 'semantic-ui-react'
import Track from './Track'
import { v4 as uuid } from 'uuid'

export default class TracksList extends React.PureComponent {
  trackData (track) {
    return (
      <Track
        key={uuid()}
        track={track}
        artistName={this.props.artistName}
        topTrackCount={this.props.topTrackCount}
      />
    )
  }

  render () {
    return (
      <Router>
        <List selection>
          {this.props.tracks.map(track => this.trackData(track))}
        </List>
      </Router>
    )
  }
}
