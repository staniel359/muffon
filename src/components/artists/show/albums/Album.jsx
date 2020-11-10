import React from 'react'
import { Card, Image, Icon, Loader, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Album extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.getListenersCount()
  }

  getListenersCount () {
    const { artistName, album } = this.props

    const artistNameEncoded = encodeURIComponent(artistName)
    const albumTitleEncoded = encodeURIComponent(album.title)
    const url = `/lastfm/artists/${artistNameEncoded}/albums/${albumTitleEncoded}`

    const handleSuccess = resp => {
      this.setState({ listenersCount: resp.data.album.listeners_count })
    }
    const handleError = () => {
      this.setState({ listenersCount: 0 })
    }

    axios.get(url).then(handleSuccess).catch(handleError)
  }

  render () {
    const { listenersCount } = this.state
    const { album, artistName } = this.props

    const albumTitle = album.title
    const artistNameEncoded = encodeURIComponent(artistName)
    const albumTitleEncoded = encodeURIComponent(albumTitle)
    const pageLink = `/artists/${artistNameEncoded}/albums/${albumTitleEncoded}`

    const albumCover = album.covers.medium
    const defaultCover =
      'https://lastfm.freetls.fastly.net/i/u/300x300/' +
      'c6f59c1e5e7240a4c0d427abd71f3dbb.png'
    const cover = albumCover || defaultCover

    const loader = <Loader active inline size="mini" />
    const listenersData =
      (listenersCount && listenersCount.toLocaleString('eu')) || loader

    return (
      <Card as={Link} to={pageLink} className="artistPageAlbumCard">
        <div />

        <Image rounded wrapped className="imageWrapBordered" src={cover} />

        <Header as="h3" content={albumTitle} />

        <Card.Content>
          <Card.Description>
            <Icon name="user" />
            {listenersData}
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}
