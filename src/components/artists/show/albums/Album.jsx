import React from 'react'
import { Card, Image, Icon, Loader } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Album extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.getListenersCount()
  }

  getListenersCount () {
    axios(this.albumLink()).then(resp => this.setListenersCount(resp))
  }

  albumLink () {
    return {
      method: 'GET',
      url: `/lastfm/artists/${this.artistName}/albums/${this.albumTitle}`
    }
  }

  artistName = encodeURIComponent(this.props.artistName)
  albumTitle = encodeURIComponent(this.props.album.title)

  setListenersCount (resp) {
    this.setState({ listenersCount: resp.data.album.listeners_count })
  }

  albumPageLink () {
    return `/artists/${this.artistName}/albums/${this.albumTitle}`
  }

  albumData () {
    return (
      <Card as={Link} to={this.albumPageLink()}>
        <Image
          src={this.cover()}
          wrapped
          ui={false}
          className="artistPageAlbumCover"
        />

        {this.albumDataContent()}
      </Card>
    )
  }

  cover () {
    return this.coverSrc || this.defaultCoverSrc
  }

  coverSrc = this.props.album.covers.cropped_300
  defaultCoverSrc =
    'https://lastfm.freetls.fastly.net/i/u/300x300/c6f59c1e5e7240a4c0d427abd71f3dbb.png'

  albumDataContent () {
    return (
      <Card.Content textAlign="center">
        <Card.Header content={this.props.album.title} />
        <Card.Description className="artistPageAlbumListeners">
          <Icon name="user" />
          {this.listenersData() || <Loader active inline size="mini" />}
        </Card.Description>
      </Card.Content>
    )
  }

  listenersData () {
    return (
      this.state.listenersCount &&
      this.state.listenersCount.toLocaleString('eu')
    )
  }

  render () {
    return this.albumData()
  }
}
