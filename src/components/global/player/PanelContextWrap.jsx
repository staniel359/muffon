import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import PlayerPanel from './Panel'

export default class PanelContextWrap extends React.PureComponent {
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
