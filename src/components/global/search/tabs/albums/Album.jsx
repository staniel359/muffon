import React from 'react'
import { List, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ListenersCount from 'global/artists/albums/ListenersCount'

export default class Album extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isArtistHovered: false }
  }

  render () {
    const { album, hideSearch } = this.props
    const { isArtistHovered } = this.state

    const artistName = album.artist
    const artistNameEncoded = encodeURIComponent(artistName)
    const artistPageLink = `/artists/${artistNameEncoded}`

    const albumTitle = album.title
    const albumTitleEncoded = encodeURIComponent(albumTitle)
    const albumPageLink = `/artists/${artistNameEncoded}/albums/${albumTitleEncoded}`

    const albumOrArtistLink = isArtistHovered ? artistPageLink : albumPageLink

    const image = album.images.extrasmall
    const imageData = (
      <div className="searchItemImage">
        <Image wrapped rounded className="imageWrapBordered" src={image} />
      </div>
    )

    const albumTitleClassName = !isArtistHovered ? 'searchItemMainTitle' : ''
    const albumTitleData = (
      <List.Header
        as="h4"
        className={albumTitleClassName}
        content={albumTitle}
      />
    )

    const artistNameClassName = isArtistHovered ? 'searchItemMainTitle' : ''
    const toggleArtistHovered = bool =>
      this.setState({ isArtistHovered: !isArtistHovered })
    const artistNameData = (
      <List.Description
        className={artistNameClassName}
        content={artistName}
        onMouseEnter={toggleArtistHovered}
        onMouseLeave={toggleArtistHovered}
      />
    )

    const listenersCountProps = { artistName, albumTitle }
    const listenersCountData = (
      <div className="searchItemExtra">
        <ListenersCount {...listenersCountProps} />
      </div>
    )

    const infoData = (
      <List.Content className="searchItemContent">
        {albumTitleData}
        {artistNameData}
        {listenersCountData}
      </List.Content>
    )

    const contentData = (
      <React.Fragment>
        {imageData}
        {infoData}
      </React.Fragment>
    )

    return (
      <List.Item
        className="searchItem"
        as={Link}
        to={albumOrArtistLink}
        onClick={hideSearch}
        content={contentData}
      />
    )
  }
}
