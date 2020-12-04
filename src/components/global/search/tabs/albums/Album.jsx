import React from 'react'
import { List, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Album extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { active: false, artistHovered: false }
  }

  render () {
    const { album, hideSearch } = this.props
    const { active, artistHovered } = this.state

    const artistNameEncoded = encodeURIComponent(album.artist)
    const artistPageLink = `/artists/${artistNameEncoded}`

    const albumTitleEncoded = encodeURIComponent(album.title)
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
        content={album.title}
      />
    )

    const artistNameClassName = artistHovered ? 'colorBase' : ''
    const toggleArtistHovered = bool =>
      this.setState({ artistHovered: !artistHovered })
    const artistNameData = (
      <List.Description
        className={artistNameClassName}
        content={album.artist}
        onMouseEnter={toggleArtistHovered}
        onMouseLeave={toggleArtistHovered}
      />
    )

    const contentData = (
      <React.Fragment>
        {imageData}
        <List.Content className="searchItemAlbumContent">
          {albumTitleData}
          {artistNameData}
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
