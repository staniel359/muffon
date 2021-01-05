import React from 'react'
import { List } from 'semantic-ui-react'
import TrackContext from 'global/player/TrackContext'
import { v4 as uuid } from 'uuid'

export default class TracksList extends React.PureComponent {
  render () {
    const { album, albumSource } = this.props

    const trackData = (track, index) => {
      track.artist ||= album.artist

      const isWithArtist = track.artist !== album.artist

      const setCurrentAlbumData = () => {
        this.props.setContext({
          currentAlbum: album,
          currentAlbumSource: albumSource,
          currentAlbumTrackIndex: index
        })
      }

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
