import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import Player from 'global/Player'

export default class PanelContextWrap extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { currentTrack } = context

          return <Player {...{ currentTrack }} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
