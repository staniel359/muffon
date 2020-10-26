import React from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'
import { List, Button, Icon } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'

export default class Tracks extends React.PureComponent {
  tabData () {
    return (
      <Router>
        <List
          selection
          size="large"
          verticalAlign="middle"
          className="globalSearchTab"
        >
          {this.props.tracks.map(track => this.trackItem(track))}
        </List>
      </Router>
    )
  }

  trackItem (track) {
    return (
      <List.Item
        as={Link}
        to={`/artists/${track.artist}/tracks/${track.title}`}
        key={uuid()}
      >
        <List.Icon verticalAlign="middle">
          <Button icon>
            <Icon name="play" />
          </Button>
        </List.Icon>

        <List.Content
          className="globalSearchItemContent"
          onClick={this.props.hideGlobalSearch}
        >
          <List.Header>{track.title}</List.Header>
          <List.Description>{track.artist}</List.Description>
        </List.Content>
      </List.Item>
    )
  }

  render () {
    return (this.props.tracks && this.tabData()) || this.props.error
  }
}
