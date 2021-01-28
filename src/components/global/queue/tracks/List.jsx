import React from 'react'
import { v4 as uuid } from 'uuid'
import { List } from 'semantic-ui-react'
import TrackContext from 'global/player/TrackContext'

export default class TracksList extends React.PureComponent {
  render () {
    const { queue } = this.props

    const trackData = (track, index) => {
      const { currentAlbum } = this.props

      const isWithArtist = track.artist.name !== currentAlbum.artist.name

      const trackProps = { key: uuid(), track, index, isWithArtist }

      return <TrackContext {...trackProps} />
    }

    const tracksList = queue && queue.map(trackData)

    return (
      <List
        selection
        className="queuePanelTracks"
        size="medium"
        verticalAlign="middle"
        content={tracksList}
      />
    )
  }
}
