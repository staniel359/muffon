import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import TracksList from './List'

export default class TracksListContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { currentAlbum, queue } = context

          const tracksListProps = { currentAlbum, queue }

          return <TracksList {...tracksListProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
