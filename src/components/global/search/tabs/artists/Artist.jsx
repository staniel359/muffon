import React from 'react'
import { List, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Artist extends React.Component {
  artistLink () {
    return `/artists/${this.artistName}`
  }

  artistName = encodeURIComponent(this.props.artist.name)
  listenersCount = this.props.artist.listeners_count.toLocaleString('eu')

  render () {
    return (
      <List.Item
        as={Link}
        to={this.artistLink()}
        onClick={this.props.hideSearch}
      >
        <Image
          src={this.props.artist.image}
          avatar
          className="searchItemImage"
        />

        <List.Content className="searchItemContent">
          <List.Header as="h4" content={this.props.artist.name} />
          <List.Description content={`${this.listenersCount} listeners`} />
        </List.Content>
      </List.Item>
    )
  }
}
