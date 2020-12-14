import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import TrackPlayerPanel from './TrackPlayerPanel'

export default class TrackPlayerPanelContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const {
            getTrack,
            updateCurrentTrack,
            toggleAudio,
            audioStatus,
            currentTrack
          } = context
          const { track } = this.props

          const isPlaying = currentTrack.id === track.id

          const playerProps = {
            getTrack,
            updateCurrentTrack,
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
