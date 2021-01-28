import React from 'react'
import { List, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ListenersCount from 'global/artists/albums/ListenersCount'

export default class Album extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isArtistHovered: false }
  }

  albumOrArtistLink () {
    const { isArtistHovered } = this.state
    const { album } = this.props

    const artistNameEncoded = encodeURIComponent(album.artist.name)
    const artistPageLink = `/artists/${artistNameEncoded}`

    const albumTitleEncoded = encodeURIComponent(album.title)
    const albumPageLink = `/artists/${artistNameEncoded}/albums/${albumTitleEncoded}`

    return isArtistHovered ? artistPageLink : albumPageLink
  }

  contentData () {
    return (
      <React.Fragment>
        {this.imageData()}
        <List.Content className="searchItemContent">
          {this.albumTitleData()}
          {this.artistNameData()}
          {this.listenersCountData()}
        </List.Content>
      </React.Fragment>
    )
  }

  imageData () {
    const { album } = this.props

    const image = album.images.extrasmall

    return (
      <div className="searchItemImage">
        <Image wrapped rounded className="imageWrapBordered" src={image} />
      </div>
    )
  }

  albumTitleData () {
    const { album } = this.props
    const { isArtistHovered } = this.state

    const className = !isArtistHovered ? 'searchItemMainTitle' : ''

    return <List.Header as="h4" content={album.title} {...{ className }} />
  }

  artistNameData () {
    const { isArtistHovered } = this.state
    const { album } = this.props

    const toggleArtistHovered = () => {
      this.setState({ isArtistHovered: !isArtistHovered })
    }
    const className = isArtistHovered ? 'searchItemMainTitle' : ''

    return (
      <List.Description
        content={album.artist.name}
        onMouseEnter={toggleArtistHovered}
        onMouseLeave={toggleArtistHovered}
        {...{ className }}
      />
    )
  }

  listenersCountData () {
    const { album } = this.props

    const artistName = album.artist.name
    const albumTitle = album.title

    const listenersCountProps = { artistName, albumTitle }

    return (
      <div className="searchItemExtra">
        <ListenersCount {...listenersCountProps} />
      </div>
    )
  }

  render () {
    const { hideSearch } = this.props

    return (
      <List.Item
        className="searchItem"
        as={Link}
        to={this.albumOrArtistLink()}
        content={this.contentData()}
        onClick={hideSearch}
      />
    )
  }
}
