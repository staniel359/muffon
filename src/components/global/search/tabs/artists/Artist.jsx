import React from 'react'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Picture from 'global/artists/Picture'

export default class Artist extends React.PureComponent {
  render () {
    const { hideSearch, artist } = this.props

    const artistName = artist.name
    const artistNameEncoded = encodeURIComponent(artistName)
    const artistLink = `/artists/${artistNameEncoded}`

    const listenersCount = artist.listeners_count.toLocaleString('eu')

    return (
      <List.Item
        className="searchItem"
        as={Link}
        to={artistLink}
        onClick={hideSearch}
      >
        <div className="searchItemImage">
          <Picture circular size="extrasmall" {...{ artistName }} />
        </div>

        <List.Content className="searchItemContent">
          <List.Header as="h4" content={artistName} />
          <List.Description content={`${listenersCount} listeners`} />
        </List.Content>
      </List.Item>
    )
  }
}
