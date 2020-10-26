import React from 'react'
import { Card, Image } from 'semantic-ui-react'

export default class Album extends React.PureComponent {
  cover = this.props.album.covers.cropped_300
  title = this.props.album.title
  playsCount = this.props.album.plays_count.toLocaleString('eu')

  render () {
    return (
      <Card>
        <Image src={this.cover} wrapped ui={false} />
        <Card.Content textAlign="center">
          <Card.Header>{this.title}</Card.Header>
          <Card.Meta>{`${this.playsCount} plays`}</Card.Meta>
        </Card.Content>
      </Card>
    )
  }
}
