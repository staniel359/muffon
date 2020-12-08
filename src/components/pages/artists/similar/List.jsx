import React from 'react'
import { v4 as uuid } from 'uuid'
import Artist from './Artist'

export default class List extends React.PureComponent {
  render () {
    const { similar } = this.props

    const artistData = artist => {
      const key = uuid()
      const artistProps = { artist, key }

      return <Artist {...artistProps} />
    }
    const artistsLIstData = similar.map(artistData)
    const artistsData = similar.length > 0 && artistsLIstData

    return <React.Fragment>{artistsData}</React.Fragment>
  }
}
