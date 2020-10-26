import React from 'react'
import { v4 as uuid } from 'uuid'
import { Header, Label, Icon, Divider } from 'semantic-ui-react'

export default class Info extends React.PureComponent {
  name = this.props.info.name
  tags = this.props.info.tags
  listenersCount = this.props.info.listeners_count.toLocaleString('eu')
  playsCount = this.props.info.plays_count.toLocaleString('eu')
  description = this.props.info.description

  render () {
    return (
      <div>
        <Header size="huge" className="artistPageArtistName">
          {this.name}
        </Header>

        <Label.Group>
          {this.tags.map(tag => (
            <Label size="large" key={uuid()} as="a">
              {tag}
            </Label>
          ))}
        </Label.Group>

        <Label.Group>
          <Label basic size="large">
            <Icon name="user" />
            {this.listenersCount}
          </Label>
          <Label basic size="large">
            <Icon name="music" />
            {this.playsCount}
          </Label>
        </Label.Group>

        <Divider />

        <div className="artistDescription">{this.description}</div>
      </div>
    )
  }
}
