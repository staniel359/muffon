import React from 'react'
import { Button, Icon, List } from 'semantic-ui-react'

export default class Track extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  title = this.props.track.title
  playsCount = this.props.track.plays_count.toLocaleString('eu')
  listenersCount = this.props.track.listeners_count.toLocaleString('eu')

  handleClick = () => {
    this.setState({ loading: !this.state.loading })
  }

  render () {
    return (
      <List.Item>
        <List.Icon verticalAlign="middle">
          <Button onClick={this.handleClick} loading={this.state.loading} icon>
            <Icon name="play" />
          </Button>
        </List.Icon>

        <List.Content>
          <List.Header as="h4">{this.title}</List.Header>
          <List.Description>
            <div>{`${this.playsCount} plays`}</div>
            <div>{`${this.listenersCount} listeners`}</div>
          </List.Description>
        </List.Content>
      </List.Item>
    )
  }
}
