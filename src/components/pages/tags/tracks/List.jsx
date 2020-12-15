import React from 'react'
import { List } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import TrackContext from 'global/player/TrackContext'

export default class TracksList extends React.PureComponent {
  render () {
    const { tracks } = this.props

    const trackData = track => {
      const trackProps = { track, isWithArtist: true, key: uuid() }

      return <TrackContext {...trackProps} />
    }
    const tracksData = tracks.map(trackData)

    return <List selection content={tracksData} />
  }
}
