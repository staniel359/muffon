import React from 'react'
import { v4 as uuid } from 'uuid'
import Artist from './Artist'

export default class List extends React.PureComponent {
  render () {
    const { artists } = this.props

    const artistData = artist => {
      const key = uuid()
      const artistProps = { artist, key }

      return <Artist {...artistProps} />
    }
    const artistsLIstData = artists.map(artistData)
    const artistsData = artists.length > 0 && artistsLIstData

    return <React.Fragment>{artistsData}</React.Fragment>
  }
}
