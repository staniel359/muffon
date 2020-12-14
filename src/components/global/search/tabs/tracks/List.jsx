import React from 'react'
import { List } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import TrackContext from 'global/player/TrackContext'

export default class TracksList extends React.PureComponent {
  render () {
    const { tracks, hideSearch } = this.props

    const trackData = track => {
      const trackProps = { track, hideSearch, isWithArtist: true, key: uuid() }

      return <TrackContext {...trackProps} />
    }
    const tracksList = tracks.map(trackData)

    return (
      <List
        selection
        size="medium"
        verticalAlign="middle"
        className="searchResultsTabContentList"
        content={tracksList}
      />
    )
  }
}
