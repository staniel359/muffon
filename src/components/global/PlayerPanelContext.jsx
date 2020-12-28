import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import PlayerPanel from './PlayerPanel'

export default class PlayerPanelContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const {
            currentTrack,
            currentTrackVariants,
            currentTrackSource
          } = context

          const playerPanelProps = {
            currentTrack,
            currentTrackVariants,
            currentTrackSource
          }

          return <PlayerPanel {...playerPanelProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
