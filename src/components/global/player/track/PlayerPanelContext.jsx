import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import PlayerPanel from './PlayerPanel'

export default class PlayerPanelContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const {
            getTrackData,
            updateCurrentTrack,
            toggleAudio,
            audioStatus,
            currentTrack
          } = context
          const { track } = this.props
          const { length } = track

          const artistName = track.artist
          const trackTitle = track.title
          const trackId = track.id
          const isPlaying = currentTrack && currentTrack.id === trackId

          const playerProps = {
            getTrackData,
            updateCurrentTrack,
            toggleAudio,
            audioStatus,
            length,
            artistName,
            trackTitle,
            trackId,
            isPlaying
          }

          return <PlayerPanel {...playerProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
