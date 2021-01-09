import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import TracksList from '../tracks/List'

export default class TracksListContext extends React.PureComponent {
  render () {
    const { album } = this.props

    return (
      <PlayerContext.Consumer>
        {context => {
          const { setCurrentAlbumData } = context

          const tracksListProps = { album, setCurrentAlbumData }

          return <TracksList {...tracksListProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
