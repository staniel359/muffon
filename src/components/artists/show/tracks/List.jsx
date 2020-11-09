import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { List } from 'semantic-ui-react'
import Track from './Track'
import { v4 as uuid } from 'uuid'

export default class TracksList extends React.PureComponent {
  trackData = track => {
    const { artistName, topTrackCount } = this.props
    const key = uuid()

    return <Track {...{ key, track, artistName, topTrackCount }} />
  }

  render () {
    const { tracks } = this.props
    const tracksList = tracks.map(this.trackData)

    return (
      <Router>
        <List selection content={tracksList} />
      </Router>
    )
  }
}
