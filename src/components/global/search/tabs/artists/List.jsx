import React from 'react'
import { v4 as uuid } from 'uuid'
import { List } from 'semantic-ui-react'
import Artist from './Artist'

export default class ArtistsList extends React.PureComponent {
  render () {
    const { artists } = this.props

    const artistData = artist => {
      const { hideSearch } = this.props

      const artistProps = { key: uuid(), artist, hideSearch }

      return <Artist {...artistProps} />
    }

    const artistsListData = artists.map(artistData)

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
