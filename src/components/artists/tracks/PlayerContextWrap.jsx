import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import Player from './Player'

export default class PlayerContextWrap extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const {
            getTrackData,
            setCurrentTrackId,
            toggleAudio,
            audioStatus
          } = context
          const { track } = this.props
          const { length } = track

          const artistName = track.artist
          const trackTitle = track.title
          const trackId = track.id
          const playing = context.currentTrackId === trackId

          const playerProps = {
            getTrackData,
            setCurrentTrackId,
            toggleAudio,
            audioStatus,
            length,
            artistName,
            trackTitle,
            trackId,
            playing
          }

          return <Player {...playerProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
