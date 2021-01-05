import React from 'react'
import { List } from 'semantic-ui-react'
import TrackContext from 'global/player/TrackContext'
import { v4 as uuid } from 'uuid'

export default class TracksList extends React.PureComponent {
  render () {
    const { currentAlbum } = this.props
    const { tracks } = currentAlbum

    const trackData = (track, index) => {
      const isWithArtist = track.artist !== currentAlbum.artist

      const trackProps = { key: uuid(), track, index, isWithArtist }

      return <TrackContext {...trackProps} />
    }
    const tracksList = tracks.map(trackData)

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
