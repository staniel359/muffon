import React from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'
import { List, Image } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'

export default class Albums extends React.PureComponent {
  tabData () {
    return (
      <Router>
        <List
          selection
          size="large"
          verticalAlign="middle"
          className="globalSearchTab"
        >
          {this.props.albums.map(album => this.albumItem(album))}
        </List>
      </Router>
    )
  }

  albumItem (album) {
    return (
      <List.Item
        as={Link}
        to={`/artists/${album.artist}/albums/${album.title}`}
        key={uuid()}
        onClick={this.props.hideGlobalSearch}
      >
        <Image src={album.cover} className="globalSearchItemImage" />
        <List.Content className="globalSearchItemContent">
          <List.Header>{album.title}</List.Header>
          <List.Description>{album.artist}</List.Description>
        </List.Content>
      </List.Item>
    )
  }

  render () {
    return (this.props.albums && this.tabData()) || this.props.error
  }
}
