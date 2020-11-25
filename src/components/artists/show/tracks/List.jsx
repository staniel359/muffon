import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { List } from 'semantic-ui-react'
import Track from 'global/artists/Track'
import { v4 as uuid } from 'uuid'
import PlayerContext from 'contexts/PlayerContext'

export default class TracksList extends React.PureComponent {
  render () {
    const { tracks, artistName, topTrackCount } = this.props

    const trackData = track => (
      <PlayerContext.Consumer key={uuid()}>
        {context => {
          const trackProps = { track, artistName, topTrackCount }

          const isPlaying = context.currentTrackId === track.id
          const trackGlobalProps = { isPlaying }

          return <Track {...trackProps} {...trackGlobalProps} />
        }}
      </PlayerContext.Consumer>
    )
    const tracksList = tracks.map(trackData)

    return (
      <Router>
        <List selection content={tracksList} />
      </Router>
    )
  }
}
