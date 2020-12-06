import React from 'react'
import { Segment } from 'semantic-ui-react'
import axios from 'axios'
import ErrorMessage from 'global/ErrorMessage'
import LoaderDimmer from 'global/LoaderDimmer'
import LeftColumn from './columns/Left'
import RightColumn from './columns/Right'

export default class Show extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    const { artistName, albumTitle } = this.params()

    this.setNavSections(artistName, albumTitle)
    this.getInfo()
  }

  componentDidUpdate (prevProps, prevState) {
    this.handleAlbumChange(prevProps)
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  params = () => this.props.match.params

  handleAlbumChange (prevProps) {
    const { artistName, albumTitle } = this.params()

    const prevArtistName = prevProps.match.params.artistName
    const isArtistNameChanged = artistName !== prevArtistName

    const prevAlbumTitle = prevProps.match.params.albumTitle
    const isAlbumTitleChanged = albumTitle !== prevAlbumTitle

    const isAlbumChanged = isArtistNameChanged || isAlbumTitleChanged

    if (isAlbumChanged) {
      this.setNavSections(artistName, albumTitle)
      this.setState({ album: null })
      this.getInfo()
    }
  }

  getInfo () {
    const switchLoader = isLoading => {
      this._isMounted && this.setState({ ...{ isLoading } })
    }

    switchLoader(true)

    const { artistName, albumTitle } = this.params()

    const url = `/lastfm/artists/${artistName}/albums/${albumTitle}`
    const cancelToken = this.request.token
    const extra = { ...{ cancelToken } }

    const handleSuccess = resp => {
      const { album } = resp.data

      this.setState({ ...{ album } })
      this.setNavSections(album.artist, album.title)
    }

    const handleError = error => {
      !axios.isCancel(error) && this.setState({ ...{ error } })
    }

    const handleFinish = () => switchLoader(false)

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
  }

  setNavSections (artistName, albumTitle) {
    const artistNameEncoded = encodeURIComponent(artistName)

    const artistPageLink = `#/artists/${artistNameEncoded}`
    const albumsPageLink = `#/artists/${artistNameEncoded}/albums`

    const navSections = [
      { content: 'Artists' },
      { content: decodeURIComponent(artistName), href: artistPageLink },
      { content: 'Albums', href: albumsPageLink },
      { content: decodeURIComponent(albumTitle), active: true }
    ]

    this.props.setNavSections(navSections)
  }

  albumData () {
    const { album } = this.state

    return (
      <Segment className="pageSegment">
        <LeftColumn {...{ album }} />
        <RightColumn {...{ album }} />
      </Segment>
    )
  }

  render () {
    const { isLoading, album, error } = this.state

    const albumData = album && this.albumData()

    const errorData = error && <ErrorMessage {...{ error }} />

    const loaderData = isLoading && <LoaderDimmer />

    const contentData = albumData || errorData || loaderData

    return <React.Fragment>{contentData}</React.Fragment>
  }
}
