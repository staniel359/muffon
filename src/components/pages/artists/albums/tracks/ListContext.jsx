import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import TracksList from '../tracks/List'

export default class TracksListContext extends React.PureComponent {
  render () {
    const { album, albumSource } = this.props

    return (
      <PlayerContext.Consumer>
        {context => {
          const { setContext } = context

          const tracksListProps = { album, albumSource, setContext }

          return <TracksList {...tracksListProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
