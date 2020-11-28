import React from 'react'
import { v4 as uuid } from 'uuid'
import { List } from 'semantic-ui-react'
import TrackContextWrap from 'global/artists/TrackContextWrap'
import { HashRouter as Router } from 'react-router-dom'

export default class TracksList extends React.PureComponent {
  render () {
    const { tracks, artistName, topTrackCount } = this.props

    const trackData = track => {
      const key = uuid()
      const trackProps = { track, artistName, topTrackCount, key }

      return <TrackContextWrap {...trackProps} />
    }
    const tracksListData = tracks.map(trackData)

    return (
      <Router>
        <List selection content={tracksListData} />
      </Router>
    )
  }
}
