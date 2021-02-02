import React from 'react'
import { v4 as uuid } from 'uuid'
import { List } from 'semantic-ui-react'
import TrackContext from 'global/player/TrackContext'

export default class TracksList extends React.PureComponent {
  trackData = (track, index) => {
    const { album } = this.props

    track.artist ||= album.artist

    const isWithArtist = track.artist.name !== album.artist.name

    const addAlbumToQueue = () => {
      const { addAlbumToQueue } = this.props

      addAlbumToQueue(album)
    }

    const trackProps = {
      key: uuid(),
      track,
      index,
      isWithArtist,
      addAlbumToQueue
    }

    return <TrackContext {...trackProps} />
  }

  render () {
    const { tracks } = this.props.album

    const tracksList = tracks && tracks.map(this.trackData)

    return <List selection content={tracksList} />
  }
}
