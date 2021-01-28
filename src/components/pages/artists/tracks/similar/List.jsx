import React from 'react'
import { v4 as uuid } from 'uuid'
import { List } from 'semantic-ui-react'
import TrackContext from 'global/player/TrackContext'

export default class SimilarList extends React.PureComponent {
  render () {
    const { similar } = this.props

    const trackData = track => {
      const trackProps = { key: uuid(), track, isWithArtist: true }

      return <TrackContext {...trackProps} />
    }

    const tracksData = similar.map(trackData)

    return <List selection content={tracksData} />
  }
}
