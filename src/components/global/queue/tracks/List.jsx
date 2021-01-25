import React from 'react'
import { List } from 'semantic-ui-react'
import TrackContext from 'global/player/TrackContext'
import { v4 as uuid } from 'uuid'

export default class TracksList extends React.PureComponent {
  render () {
    const { currentAlbum, queue } = this.props

    const trackData = (track, index) => {
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
