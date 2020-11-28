import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { List } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import TrackContextWrap from 'global/artists/TrackContextWrap'

export default class TracksList extends React.PureComponent {
  render () {
    const { tracks, hideSearch } = this.props

    const trackData = track => {
      const artistName = track.artist
      const artist = true
      const key = uuid()
      const trackProps = { track, artistName, artist, hideSearch, key }

      return <TrackContextWrap {...trackProps} />
    }
    const tracksList = tracks.map(trackData)

    return (
      <Router>
        <List
          selection
          size="medium"
          verticalAlign="middle"
          className="searchResultsTabContentList"
          content={tracksList}
        />
      </Router>
    )
  }
}
