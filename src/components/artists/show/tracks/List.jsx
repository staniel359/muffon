import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { List } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import TrackContextWrap from 'global/artists/TrackContextWrap'

export default class TracksList extends React.PureComponent {
  render () {
    const { tracks, artistName, topTrackCount } = this.props

    const trackData = track => {
      const key = uuid()
      const trackProps = { track, artistName, topTrackCount, key }

      return <TrackContextWrap {...trackProps} />
    }
    const tracksList = tracks.map(trackData)

    return (
      <Router>
        <List selection content={tracksList} />
      </Router>
    )
  }
}
