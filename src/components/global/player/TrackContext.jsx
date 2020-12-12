import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import Track from './Track'

export default class TrackContext extends React.PureComponent {
  render () {
    const {
      track,
      artistName,
      topTrackCount,
      index,
      artist,
      hideSearch
    } = this.props

    const trackProps = {
      track,
      artistName,
      topTrackCount,
      index,
      artist,
      hideSearch
    }

    return (
      <PlayerContext.Consumer>
        {context => {
          const {
            toggleAudio,
            updateCurrentTrack,
            getTrackData,
            currentTrack
          } = context

          const isPlaying = currentTrack && currentTrack.id === track.id
          const audioStatus = isPlaying && context.audioStatus

          const trackGlobalProps = {
            toggleAudio,
            updateCurrentTrack,
            getTrackData,
            isPlaying,
            audioStatus
          }

          return <Track {...trackProps} {...trackGlobalProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
