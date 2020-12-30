import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import Track from './Track'

export default class TrackContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const {
            currentTrack,
            currentTrackSource,
            currentTrackIsFromAlbum
          } = context

          const trackProps = {
            currentTrack,
            currentTrackSource,
            currentTrackIsFromAlbum
          }

          return <Track {...trackProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
