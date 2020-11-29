import React from 'react'
import { List } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import TrackContextWrap from 'global/artists/TrackContextWrap'

export default class TracksList extends React.PureComponent {
  render () {
    const { tracks, artistName, topTrackCount } = this.props

    const trackData = track => {
      const key = uuid()
      const trackProps = { track, artistName, topTrackCount, key }

      return <TrackContextWrap {...trackProps} />
    }
    const tracksListData = tracks.map(trackData)
    const tracksData = tracks.length > 0 && (
      <List selection content={tracksListData} />
    )

    return <React.Fragment>{tracksData}</React.Fragment>
  }
}
