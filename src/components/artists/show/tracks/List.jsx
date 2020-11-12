import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { List } from 'semantic-ui-react'
import Track from 'global/artists/Track'
import { v4 as uuid } from 'uuid'

export default class TracksList extends React.PureComponent {
  render () {
    const { tracks, artistName, topTrackCount } = this.props

    const trackData = track => (
      <Track key={uuid()} {...{ track, artistName, topTrackCount }} />
    )
    const tracksList = tracks.map(trackData)

    return (
      <Router>
        <List selection content={tracksList} />
      </Router>
    )
  }
}
