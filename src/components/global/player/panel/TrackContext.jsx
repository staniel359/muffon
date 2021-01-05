import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import Track from './Track'

export default class TrackContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { currentTrack, currentTrackSource } = context

          const trackProps = { currentTrack, currentTrackSource }

          return <Track {...trackProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
