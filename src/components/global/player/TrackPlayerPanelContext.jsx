import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import TrackPlayerPanel from './TrackPlayerPanel'

export default class TrackPlayerPanelContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { getTrack, toggleAudio, audioStatus, currentTrackId } = context
          const { track } = this.props

          const isPlaying = currentTrackId && currentTrackId === track.id

          const playerProps = {
            getTrack,
            toggleAudio,
            audioStatus,
            track,
            isPlaying
          }

          return <TrackPlayerPanel {...playerProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
