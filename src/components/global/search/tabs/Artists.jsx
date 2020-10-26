import React from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'
import { List, Image } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'

export default class Artists extends React.PureComponent {
  tabData () {
    return (
      <Router>
        <List
          selection
          size="large"
          verticalAlign="middle"
          className="globalSearchTab"
        >
          {this.props.artists.map(artist => this.artistItem(artist))}
        </List>
      </Router>
    )
  }

  artistItem (artist) {
    return (
      <List.Item
        as={Link}
        to={`/artists/${artist.name}`}
        key={uuid()}
        onClick={this.props.hideGlobalSearch}
      >
        <Image src={artist.image} avatar className="globalSearchItemImage" />
        <List.Content className="globalSearchItemContent">
          <List.Header>{artist.name}</List.Header>
        </List.Content>
      </List.Item>
    )
  }

  render () {
    return (this.props.artists && this.tabData()) || this.props.error
  }
}
