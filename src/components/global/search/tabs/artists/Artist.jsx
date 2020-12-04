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

    const circular = true
    const size = 'extrasmall'
    const pictureProps = { artistName, size, circular }
    const imageData = (
      <div className="searchItemImage">
        <Picture {...pictureProps} />
      </div>
    )

    const artistNameData = (
      <List.Header
        as="h4"
        className="searchItemMainTitle"
        content={artistName}
      />
    )

    const listenersCountData = (
      <div className="searchItemListeners">
        {artist.listeners_count.toLocaleString('eu') + ' listeners'}
      </div>
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
        className="searchItemArtist"
        as={Link}
        to={artistLink}
        onClick={hideSearch}
        content={contentData}
      />
    )
  }
}
