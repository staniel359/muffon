import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Album extends React.Component {
  albumTitle = encodeURIComponent(this.props.album.title)

  coverSrc = this.props.album.covers.cropped_300
  defaultCoverSrc =
    'https://lastfm.freetls.fastly.net/i/u/300x300/c6f59c1e5e7240a4c0d427abd71f3dbb.png'

  playsCount = this.props.album.plays_count.toLocaleString('eu')

  albumLink () {
    return `/artists/${this.props.artistName}/albums/${this.albumTitle}`
  }

  render () {
    return (
      <Card>
        <Image
          src={this.coverSrc || this.defaultCoverSrc}
          wrapped
          ui={false}
          className="artistPageAlbumCover"
        />
        <Card.Content textAlign="center">
          <Card.Header
            as={Link}
            to={this.albumLink()}
            content={this.props.album.title}
          />
          <Card.Meta content={`${this.playsCount} plays`} />
        </Card.Content>
      </Card>
    )
  }
}
