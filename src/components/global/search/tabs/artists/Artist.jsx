import React from 'react'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Image from 'global/artists/Image'

export default class Artist extends React.PureComponent {
  render () {
    const { hideSearch, artist } = this.props

    const artistNameEncoded = encodeURIComponent(artist.name)
    const artistLink = `/artists/${artistNameEncoded}`

    const imageProps = {
      artistName: artist.name,
      size: 'extrasmall',
      circular: true
    }
    const imageData = (
      <div className="searchItemImage">
        <Image {...imageProps} />
      </div>
    )

    const artistNameData = (
      <List.Header
        as="h4"
        className="searchItemMainTitle"
        content={artist.name}
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
