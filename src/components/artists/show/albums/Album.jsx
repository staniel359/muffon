import React from 'react'
import { Card, Image } from 'semantic-ui-react'

export default class Album extends React.Component {
  format (number) {
    return number.toLocaleString('eu')
  }

  render () {
    return (
      <Card>
        <Image src={this.props.album.covers.cropped_300} wrapped ui={false} />
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
