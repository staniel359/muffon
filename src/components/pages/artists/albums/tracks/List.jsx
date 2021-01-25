import React from 'react'
import { List } from 'semantic-ui-react'
import TrackContext from 'global/player/TrackContext'
import { v4 as uuid } from 'uuid'

export default class TracksList extends React.PureComponent {
  render () {
    const { album } = this.props

    const setCurrentAlbumData = () => {
      const { setCurrentAlbumData } = this.props

      setCurrentAlbumData(album)
    }

    const trackData = (track, index) => {
      track.artist ||= album.artist

      const isWithArtist = track.artist.name !== album.artist.name

      const trackProps = {
        key: uuid(),
        track,
        index,
        isWithArtist,
        setCurrentAlbumData
      }

      return <TrackContext {...trackProps} />
    }

    const tracksList = album.tracks.map(trackData)

    return <List selection content={tracksList} />
  }
}
