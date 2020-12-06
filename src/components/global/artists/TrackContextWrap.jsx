import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import Track from './Track'

export default class TrackContextWrap extends React.PureComponent {
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
            audioStatus,
            toggleAudio,
            setCurrentTrackId,
            getTrackData,
            currentTrackId
          } = context
          const isPlaying = currentTrackId === track.id
          const trackGlobalProps = {
            isPlaying,
            ...(isPlaying && { audioStatus }),
            toggleAudio,
            setCurrentTrackId,
            getTrackData
          }

          return <Track {...trackProps} {...trackGlobalProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
