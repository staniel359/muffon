import React from 'react'
import { List } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import TrackContext from 'global/player/TrackContext'

export default class SimilarList extends React.PureComponent {
  render () {
    const { similar } = this.props

    const trackData = track => {
      const trackProps = { track, isWithArtist: true, key: uuid() }

      return <TrackContext {...trackProps} />
    }
    const tracksListData = similar.map(trackData)
    const tracksData = similar.length > 0 && (
      <List selection content={tracksListData} />
    )

    return <React.Fragment>{tracksData}</React.Fragment>
  }
}
