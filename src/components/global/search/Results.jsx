import React from 'react'
import axios from 'axios'
import Tabs from './Tabs'

export default class Results extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.search()
  }

  search () {
    this.searchArtists()
    this.searchAlbums()
    this.searchTracks()
  }

  searchArtists () {
    this.setState({ artistsLoaded: false })

    axios(this.searchArtistsLink())
      .then(resp => this.setArtistsSearchResults(resp))
      .catch(error => this.handleArtistsError(error))
      .then(() => this.setState({ artistsLoaded: true }))
  }

  searchArtistsLink () {
    return {
      method: 'GET',
      url: '/lastfm/search/artists',
      params: {
        query: this.props.query,
        limit: 20
      }
    }
  }

  setArtistsSearchResults (resp) {
    this.setState({
      artists: resp.data.search.artists
    })
  }

  handleArtistsError (error) {
    this.setState({
      artistsError: this.errorCode(error),
      artists: null
    })
  }

  errorCode (error) {
    return (error.response && error.response.status) || 500
  }

  searchAlbums () {
    this.setState({ albumsLoaded: false })

    axios(this.searchAlbumsLink())
      .then(resp => this.setAlbumsSearchResults(resp))
      .catch(error => this.handleAlbumsError(error))
      .then(() => this.setState({ albumsLoaded: true }))
  }

  searchAlbumsLink () {
    return {
      method: 'GET',
      url: '/lastfm/search/albums',
      params: {
        query: this.props.query,
        limit: 20
      }
    }
  }

  setAlbumsSearchResults (resp) {
    this.setState({
      albums: resp.data.search.albums
    })
  }

  handleAlbumsError (error) {
    this.setState({
      albumsError: this.errorCode(error),
      albums: null
    })
  }

  searchTracks () {
    this.setState({ tracksLoaded: false })

    axios(this.searchTracksLink())
      .then(resp => this.setTracksSearchResults(resp))
      .catch(error => this.handleTracksError(error))
      .then(() => this.setState({ tracksLoaded: true }))
  }

  searchTracksLink () {
    return {
      method: 'GET',
      url: '/lastfm/search/tracks',
      params: {
        query: this.props.query,
        limit: 50
      }
    }
  }

  setTracksSearchResults (resp) {
    this.setState({
      tracks: resp.data.search.tracks
    })
  }

  handleTracksError (error) {
    this.setState({
      tracksError: this.errorCode(error),
      tracks: null
    })
  }

  searchResultsTabs () {
    const {
      artists,
      artistsLoaded,
      albums,
      albumsLoaded,
      tracks,
      tracksLoaded,
      hideGlobalSearch
    } = this.state

    return (
      <Tabs
        {...{
          artists,
          artistsLoaded,
          albums,
          albumsLoaded,
          tracks,
          tracksLoaded,
          hideGlobalSearch
        }}
        hideGlobalSearch={this.props.hideGlobalSearch}
      />
    )
  }

  render () {
    return this.searchResultsTabs()
  }
}
