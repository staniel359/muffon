import React from 'react'
import axios from 'axios'
import PageData from './show/PageData'
import { Dimmer, Loader } from 'semantic-ui-react'

export class Show extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.getArtistInfo()
  }

  artistName = this.props.match.params.artistName

  getArtistInfo () {
    this.startLoader()
    axios(this.artistLink())
      .then(resp => this.handleSuccess(resp))
      .catch(error => this.handleError(error))
      .then(() => this.stopLoader())
  }

  startLoader () {
    this.setState({ loading: true })
  }

  artistLink () {
    return {
      method: 'GET',
      url: `/lastfm/artists/${this.artistName}`
    }
  }

  handleSuccess (resp) {
    this.setArtistInfo(resp)
    this.resetData()
    this.getArtistImage()
    this.getArtistTracks()
    this.getArtistAlbums()
  }

  setArtistInfo (resp) {
    this.setState({ info: resp.data.artist })
  }

  resetData () {
    this.setState({
      image: null,
      tracks: null,
      albums: null
    })
  }

  getArtistImage () {
    axios(this.artistImagesLink()).then(resp => this.setArtistImage(resp))
  }

  artistImagesLink () {
    return {
      method: 'GET',
      url: `/lastfm/artists/${this.artistName}/images`
    }
  }

  setArtistImage (resp) {
    this.setState({
      image: resp.data.artist.images[0] || 'noImage'
    })
  }

  getArtistTracks () {
    axios(this.artistTracksLink()).then(resp => this.setArtistTracks(resp))
  }

  artistTracksLink () {
    return {
      method: 'GET',
      url: `/lastfm/artists/${this.artistName}/tracks`,
      params: { limit: 10 }
    }
  }

  setArtistTracks (resp) {
    this.setState({
      tracks: resp.data.artist.tracks
    })
  }

  getArtistAlbums () {
    axios(this.artistAlbumsLink()).then(resp => this.setArtistAlbums(resp))
  }

  artistAlbumsLink () {
    return {
      method: 'GET',
      url: `/lastfm/artists/${this.artistName}/albums`,
      params: { limit: 4 }
    }
  }

  setArtistAlbums (resp) {
    this.setState({
      albums: resp.data.artist.albums
    })
  }

  handleError (error) {
    this.setState({
      error: error.message,
      info: null
    })
  }

  stopLoader () {
    this.setState({ loading: false })
  }

  loader () {
    return (
      this.state.loading && (
        <Dimmer className="fixed" active inverted>
          <Loader inverted />
        </Dimmer>
      )
    )
  }

  pageDataOrError () {
    return (this.state.info && this.pageData()) || this.state.error
  }

  pageData () {
    const { info, image, tracks, albums } = this.state
    return <PageData {...{ info, image, tracks, albums }} />
  }

  render () {
    return (
      <div>
        {this.loader()}

        {this.pageDataOrError()}
      </div>
    )
  }
}
