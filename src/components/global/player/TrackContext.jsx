import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import Track from './Track'

export default class TrackContext extends React.PureComponent {
  render () {
    const { track, topTrackCount, index, isWithArtist, hideSearch } = this.props

    return (
      <PlayerContext.Consumer>
        {context => {
          const {
            toggleAudio,
            updateCurrentTrack,
            getTrack,
            currentTrack
          } = context

          const isPlaying = currentTrack.id === track.id
          const audioStatus = isPlaying && context.audioStatus

          const trackProps = {
            track,
            topTrackCount,
            index,
            isWithArtist,
            hideSearch,
            toggleAudio,
            updateCurrentTrack,
            getTrack,
            isPlaying,
            audioStatus
          }

          return <Track {...trackProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
