import React from 'react'
import { List } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import Artist from './Artist'

export default class ArtistsList extends React.PureComponent {
  render () {
    const { artists, hideSearch } = this.props

    const artistData = artist => {
      const key = uuid()
      const artistProps = { artist, hideSearch, key }

      return <Artist {...artistProps} />
    }
    const artistsListData = artists && artists.map(artistData)

    return (
      <List
        selection
        size="medium"
        verticalAlign="middle"
        className="searchResultsTabContentList"
        content={artistsListData}
      />
    )
  }
}
