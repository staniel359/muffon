import React from 'react'
import { v4 as uuid } from 'uuid'
import { List } from 'semantic-ui-react'
import TrackContext from 'global/player/TrackContext'

export default class TracksList extends React.PureComponent {
  render () {
    const { tracks } = this.props

    const trackData = track => {
      const { hideSearch } = this.props

      const trackProps = { key: uuid(), isWithArtist: true, track, hideSearch }

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
