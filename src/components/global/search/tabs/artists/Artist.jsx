import React from 'react'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Picture from 'global/artists/Picture'

export default class Artist extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { active: false }
  }

  render () {
    const { hideSearch, artist } = this.props
    const { active } = this.state

    const artistName = artist.name
    const artistNameEncoded = encodeURIComponent(artistName)
    const artistLink = `/artists/${artistNameEncoded}`

    const toggleActive = bool => this.setState({ active: !active })

    const imageData = (
      <div className="searchItemImage">
        <Picture circular size="extrasmall" {...{ artistName }} />
      </div>
    )

    const artistNameClassName = active ? 'colorBase' : ''
    const artistNameData = (
      <List.Header
        as="h4"
        className={artistNameClassName}
        content={artistName}
      />
    )

    const listenersCount = artist.listeners_count.toLocaleString('eu')
    const listenersCountData = (
      <List.Description content={`${listenersCount} listeners`} />
    )

    const contentData = (
      <React.Fragment>
        {imageData}
        <List.Content className="searchItemContent">
          {artistNameData}
          {listenersCountData}
        </List.Content>
      </React.Fragment>
    )

    return (
      <List.Item
        className="searchItem"
        as={Link}
        to={artistLink}
        onClick={hideSearch}
        onMouseEnter={toggleActive}
        onMouseLeave={toggleActive}
        content={contentData}
      />
    )
  }
}
