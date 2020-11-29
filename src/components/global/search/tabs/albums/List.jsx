import React from 'react'
import { List } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import Album from './Album'

export default class AlbumsList extends React.PureComponent {
  render () {
    const { albums, hideSearch } = this.props

    const albumData = album => {
      const key = uuid()
      const albumsProps = { album, hideSearch, key }

      return <Album {...albumsProps} />
    }
    const albumsListData = albums.map(albumData)

    return (
      <List
        selection
        size="medium"
        verticalAlign="middle"
        className="searchResultsTabContentList"
        content={albumsListData}
      />
    )
  }
}
