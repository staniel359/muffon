import React from 'react'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Image from 'global/artists/Image'

export default class Artist extends React.PureComponent {
  contentData () {
    return (
      <React.Fragment>
        {this.imageData()}
        <List.Content className="searchItemContent">
          {this.artistNameData()}
          {this.listenersCountData()}
        </List.Content>
      </React.Fragment>
    )
  }

  imageData () {
    const { artist } = this.props

    const imageProps = {
      artistName: artist.name,
      size: 'extrasmall',
      circular: true
    }

    return (
      <div className="searchItemImage">
        <Image {...imageProps} />
      </div>
    )
  }

  artistNameData () {
    const { artist } = this.props

    return (
      <List.Header
        as="h4"
        className="searchItemMainTitle"
        content={artist.name}
      />
    )
  }

  listenersCountData () {
    const { artist } = this.props

    const listenersCount = artist.listeners_count.toLocaleString('eu')
    const listenersCountData = `${listenersCount} listeners`

    return <div>{listenersCountData}</div>
  }

  render () {
    const { artist, hideSearch } = this.props

    const artistNameEncoded = encodeURIComponent(artist.name)
    const artistLink = `/artists/${artistNameEncoded}`

    return (
      <List.Item
        className="searchItem"
        as={Link}
        to={artistLink}
        content={this.contentData()}
        onClick={hideSearch}
      />
    )
  }
}
