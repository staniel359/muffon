import React from 'react'
import { Button, List } from 'semantic-ui-react'

export default class Track extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  handleClick = () => {
    this.setState({ loading: !this.state.loading })
  }

  format (number) {
    return number.toLocaleString('eu')
  }

  render () {
    return (
      <List.Item>
        <List.Icon verticalAlign="middle">
          <Button
            onClick={this.handleClick}
            loading={this.state.loading}
            icon="play"
          />
        </List.Icon>

        <List.Content>
          <List.Header as="h4" content={this.props.track.title} />
          <List.Description>
            <div>{`${this.format(this.props.track.plays_count)} plays`}</div>
            <div>{`${this.format(
              this.props.track.listeners_count
            )} listeners`}</div>
          </List.Description>
        </List.Content>
      </List.Item>
    )
  }
}
