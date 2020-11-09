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
    const url =
      `/lastfm/artists/${this.artistNameEncoded}` +
      `/albums/${this.albumTitleEncoded}`

    axios.get(url).then(this.handleSuccess).catch(this.handleError)
  }

  artistNameEncoded = encodeURIComponent(this.props.artistName)
  albumTitleEncoded = encodeURIComponent(this.props.album.title)

  handleSuccess = resp => {
    const listenersCount = resp.data.album.listeners_count

    this.setState({ listenersCount: listenersCount })
  }

  handleError = () => {
    this.setState({ listenersCount: 0 })
  }

  render () {
    const { listenersCount } = this.state
    const { album } = this.props

    const pageLink =
      `/artists/${this.artistNameEncoded}/albums/${this.albumTitleEncoded}`
    const albumCover = album.covers.medium
    const defaultCover =
      'https://lastfm.freetls.fastly.net/i/u/300x300/' +
      'c6f59c1e5e7240a4c0d427abd71f3dbb.png'
    const cover = albumCover || defaultCover
    const albumTitle = album.title
    const listenersData = listenersCount && listenersCount.toLocaleString('eu')

    const loader = <Loader active inline size="mini" />

    return (
      <Card as={Link} to={pageLink} className="artistPageAlbumCard">
        <div />

        <Image rounded wrapped className="imageWrapBordered" src={cover} />

        <Header as="h3" content={albumTitle} />

        <Card.Content>
          <Card.Description>
            <Icon name="user" />
            {listenersData || loader}
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}
