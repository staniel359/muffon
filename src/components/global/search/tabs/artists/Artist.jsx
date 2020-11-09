import React from 'react'
import { List, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Artist extends React.PureComponent {
  render () {
    const { hideSearch, artist } = this.props

    const artistNameEncoded = encodeURIComponent(artist.name)
    const artistLink = `/artists/${artistNameEncoded}`

    const listenersCount = artist.listeners_count.toLocaleString('eu')

    return (
      <List.Item as={Link} to={artistLink} onClick={hideSearch}>
        <Image src={artist.image} avatar className="searchItemImage" />

        <List.Content className="searchItemContent">
          <List.Header as="h4" content={artist.name} />
          <List.Description content={`${listenersCount} listeners`} />
        </List.Content>
      </List.Item>
    )
  }
}
