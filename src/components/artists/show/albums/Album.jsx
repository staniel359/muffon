import React from 'react'
import { Card, Image } from 'semantic-ui-react'

export default class Album extends React.Component {
  cover = this.props.album.covers.cropped_300
  coverDefault =
    'https://lastfm.freetls.fastly.net/i/u/300x300/c6f59c1e5e7240a4c0d427abd71f3dbb.png'

  format (number) {
    return number.toLocaleString('eu')
  }

  render () {
    return (
      <Card>
        <Image src={this.cover || this.coverDefault} wrapped ui={false} />
        <Card.Content textAlign="center">
          <Card.Header content={this.props.album.title} />
          <Card.Meta
            content={`${this.format(this.props.album.plays_count)} plays`}
          />
        </Card.Content>
      </Card>
    )
  }
}
