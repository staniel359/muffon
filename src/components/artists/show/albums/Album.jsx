import React from 'react'
import { Card, Image } from 'semantic-ui-react'

export default class Album extends React.Component {
  coverSrc = this.props.album.covers.cropped_300
  defaultCoverSrc =
    'https://lastfm.freetls.fastly.net/i/u/300x300/c6f59c1e5e7240a4c0d427abd71f3dbb.png'

  playsCount = this.props.album.plays_count.toLocaleString('eu')

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
          <Card.Header content={this.props.album.title} />
          <Card.Meta content={`${this.playsCount} plays`} />
        </Card.Content>
      </Card>
    )
  }
}
