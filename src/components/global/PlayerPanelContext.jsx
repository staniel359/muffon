import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import PlayerPanel from './PlayerPanel'

export default class PlayerPanelContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { currentTrack } = context

          return <PlayerPanel {...{ currentTrack }} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
