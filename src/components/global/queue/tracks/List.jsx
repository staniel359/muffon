import React from 'react'
import { v4 as uuid } from 'uuid'
import { List } from 'semantic-ui-react'
import TrackContext from 'global/player/TrackContext'

export default class TracksList extends React.PureComponent {
  render () {
    const { queue } = this.props

    const trackData = track => {
      const trackProps = {
        key: uuid(),
        isWithArtist: true,
        isWithAlbum: true,
        isWithAlbumImage: true,
        track
      }

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
