import React from 'react'
import { v4 as uuid } from 'uuid'
import { List } from 'semantic-ui-react'
import TrackContext from 'global/player/TrackContext'

export default class TracksList extends React.PureComponent {
  render () {
    const { tracks } = this.props

    const trackData = track => {
      const { artistName, topTrackCount } = this.props

      track.artist = { name: artistName }

      const trackProps = { key: uuid(), track, topTrackCount }

      return <TrackContext {...trackProps} />
    }

    const tracksData = tracks.map(trackData)

    return <List selection content={tracksData} />
  }
}
