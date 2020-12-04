import React from 'react'
import { List, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ListenersCount from 'global/artists/albums/ListenersCount'

export default class Album extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { active: false, artistHovered: false }
  }

  render () {
    const { album, hideSearch } = this.props
    const { active, artistHovered } = this.state

    const artistName = album.artist
    const artistNameEncoded = encodeURIComponent(artistName)
    const artistPageLink = `/artists/${artistNameEncoded}`

    const albumTitle = album.title
    const albumTitleEncoded = encodeURIComponent(albumTitle)
    const albumPageLink = `/artists/${artistNameEncoded}/albums/${albumTitleEncoded}`

    const albumOrArtistLink = artistHovered ? artistPageLink : albumPageLink

    const toggleActive = bool => this.setState({ active: !active })

    const coverDefault =
      'https://lastfm.freetls.fastly.net/i/u/64s/' +
      'c6f59c1e5e7240a4c0d427abd71f3dbb.png'
    const cover = album.cover || coverDefault
    const imageData = (
      <Image rounded className="searchItemAlbumCover" src={cover} />
    )

    const albumTitleClassName = active && !artistHovered ? 'colorBase' : ''
    const albumTitleData = (
      <List.Header
        as="h4"
        className={albumTitleClassName}
        content={albumTitle}
      />
    )

    const artistNameClassName = artistHovered ? 'colorBase' : ''
    const toggleArtistHovered = bool =>
      this.setState({ artistHovered: !artistHovered })
    const artistNameData = (
      <List.Description
        className={artistNameClassName}
        content={artistName}
        onMouseEnter={toggleArtistHovered}
        onMouseLeave={toggleArtistHovered}
      />
    )

    const listenersCountProps = { artistName, albumTitle }
    const listenersCountData = <ListenersCount {...listenersCountProps} />

    const contentData = (
      <React.Fragment>
        {imageData}
        <List.Content className="searchItemAlbumContent">
          {albumTitleData}
          {artistNameData}
          {listenersCountData}
        </List.Content>
      </React.Fragment>
    )

    return (
      <List.Item
        className="searchItem"
        as={Link}
        to={albumOrArtistLink}
        onClick={hideSearch}
        onMouseEnter={toggleActive}
        onMouseLeave={toggleActive}
        content={contentData}
      />
    )
  }
}
