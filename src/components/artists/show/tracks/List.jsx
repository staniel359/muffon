import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { List } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import TrackContextWrap from 'global/artists/TrackContextWrap'

export default class TracksList extends React.PureComponent {
  render () {
    const { tracks, artistName, topTrackCount } = this.props
    const trackData = track => {
      const trackProps = { track, artistName, topTrackCount }

      return <TrackContextWrap key={uuid()} {...trackProps} />
    }
    const tracksList = tracks.map(trackData)

    return (
      <Router>
        <List selection content={tracksList} />
      </Router>
    )
  }
}
