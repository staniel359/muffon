import React from 'react'
import { v4 as uuid } from 'uuid'
import { List } from 'semantic-ui-react'
import Album from './Album'

export default class AlbumsList extends React.PureComponent {
  render () {
    const { albums } = this.props

    const albumData = album => {
      const { hideSearch } = this.props

      const albumsProps = { key: uuid(), album, hideSearch }

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
