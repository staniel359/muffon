import React from 'react'
import { List, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Artist extends React.PureComponent {
  render () {
    const { hideSearch, artist } = this.props

    const artistName = artist.name
    const artistNameEncoded = encodeURIComponent(artistName)
    const artistLink = `/artists/${artistNameEncoded}`

    const artistImage = artist.image

    const listenersCount = artist.listeners_count.toLocaleString('eu')

    return (
      <List.Item as={Link} to={artistLink} onClick={hideSearch}>
        <Image src={artistImage} avatar className="searchItemImage" />

        <List.Content className="searchItemContent">
          <List.Header as="h4" content={artistName} />
          <List.Description content={`${listenersCount} listeners`} />
        </List.Content>
      </List.Item>
    )
  }
}
