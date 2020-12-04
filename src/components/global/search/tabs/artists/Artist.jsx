import React from 'react'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Picture from 'global/artists/Picture'

export default class Artist extends React.PureComponent {
  render () {
    const { hideSearch, artist } = this.props

    const artistName = artist.name
    const artistNameEncoded = encodeURIComponent(artistName)
    const artistLink = `/artists/${artistNameEncoded}`

    const imageData = (
      <div className="searchItemImage">
        <Picture circular size="extrasmall" {...{ artistName }} />
      </div>
    )

    const artistNameData = (
      <List.Header
        as="h4"
        className="searchItemContentMainTitle"
        content={artistName}
      />
    )

    const listenersCountData = (
      <div>{artist.listeners_count.toLocaleString('eu') + ' listeners'}</div>
    )

    const contentData = (
      <React.Fragment>
        {imageData}
        <List.Content className="searchItemContent">
          {artistNameData}
          {listenersCountData}
        </List.Content>
      </React.Fragment>
    )

    return (
      <List.Item
        className="searchItem"
        as={Link}
        to={artistLink}
        onClick={hideSearch}
        content={contentData}
      />
    )
  }
}
