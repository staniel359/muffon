import React from 'react'
import { Card, Image, Icon, Loader, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Album extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false }
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    this.getListenersCount()
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  artistNameEncoded = encodeURIComponent(this.props.artistName)
  albumTitleEncoded = encodeURIComponent(this.props.album.title)

  getListenersCount () {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const url = `/lastfm/artists/${this.artistNameEncoded}/albums/${this.albumTitleEncoded}`
    const cancelToken = this.request.token
    const extra = { ...{ cancelToken } }

    const handleSuccess = resp => {
      this.setState({ listenersCount: resp.data.album.listeners_count })
    }

    const handleError = error => {
      !axios.isCancel(error) && this.setState({ listenersCount: 0 })
    }

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(() => switchLoader(false))
  }

  render () {
    const { loading, listenersCount } = this.state
    const { album } = this.props

    const albumPageLink = `/artists/${this.artistNameEncoded}/albums/${this.albumTitleEncoded}`

    const albumCover = album.covers.medium
    const defaultCover =
      'https://lastfm.freetls.fastly.net/i/u/300x300/' +
      'c6f59c1e5e7240a4c0d427abd71f3dbb.png'
    const cover = albumCover || defaultCover

    const albumTitle = album.title

    const loaderData = loading && <Loader active inline size="mini" />

    const listenersData = listenersCount && listenersCount.toLocaleString('eu')

    const content = loaderData || listenersData

    return (
      <Card as={Link} to={albumPageLink} className="artistPageAlbumCard">
        <div />

        <Image rounded wrapped className="imageWrapBordered" src={cover} />

        <Header as="h3" content={albumTitle} />

        <Card.Content>
          <Card.Description>
            <Icon name="user" />
            {content}
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}
