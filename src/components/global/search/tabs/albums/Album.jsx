import React from 'react'
import { List, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Album extends React.Component {
  albumLink () {
    return `/artists/${this.artistName}/albums/${this.albumTitle}`
  }

  artistName = encodeURIComponent(this.props.album.artist)
  albumTitle = encodeURIComponent(this.props.album.title)

  cover () {
    return this.props.album.cover || this.coverDefault
  }

  coverDefault =
    'https://lastfm.freetls.fastly.net/i/u/64s/c6f59c1e5e7240a4c0d427abd71f3dbb.png'

  render () {
    return (
      <List.Item
        as={Link}
        to={this.albumLink()}
        onClick={this.props.hideSearch}
      >
        <Image src={this.cover()} className="searchItemImage" />
        <List.Content className="searchItemContent">
          <List.Header as="h4" content={this.props.album.title} />
          <List.Description content={this.props.album.artist} />
        </List.Content>
      </List.Item>
    )
  }
}
