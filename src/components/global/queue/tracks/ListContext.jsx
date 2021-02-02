import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import TracksList from './List'

export default class TracksListContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { queue } = context

          const tracksListProps = { queue }

          return <TracksList {...tracksListProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
