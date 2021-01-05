import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import Track from './Track'

export default class TrackContext extends React.PureComponent {
  render () {
    const {
      track,
      topTrackCount,
      index,
      isWithArtist,
      hideSearch,
      setCurrentAlbumData
    } = this.props

    return (
      <PlayerContext.Consumer>
        {context => {
          const { toggleAudio, getTrack, currentTrackId } = context

          const isPlaying = currentTrackId && track.id === currentTrackId
          const audioStatus = isPlaying && context.audioStatus

          const trackProps = {
            track,
            topTrackCount,
            index,
            isWithArtist,
            hideSearch,
            toggleAudio,
            getTrack,
            isPlaying,
            audioStatus,
            setCurrentAlbumData
          }

          return <Track {...trackProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
