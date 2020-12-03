import React from 'react'
import axios from 'axios'
import ErrorMessage from 'partials/ErrorMessage'
import LoaderDimmer from 'partials/LoaderDimmer'
import { Segment, Label } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import { Link } from 'react-router-dom'

export default class Tags extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false }
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    const { artistName, albumTitle } = this.params()

    this.setNavSections(artistName, albumTitle)
    this.getData()
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
    const artistNameChanged = artistName !== prevArtistName

    const prevAlbumTitle = prevProps.match.params.albumTitle
    const albumTitleChanged = albumTitle !== prevAlbumTitle

    const albumChanged = artistNameChanged || albumTitleChanged

    if (albumChanged) {
      this.setNavSections(artistName, albumTitle)
      this.setState({ tags: null })
      this.getData()
    }
  }

  setNavSections (artistName, albumTitle) {
    const artistNameEncoded = encodeURIComponent(artistName)
    const albumTitleEncoded = encodeURIComponent(albumTitle)

    const artistPageLink = `#/artists/${artistNameEncoded}`
    const albumsPageLink = `#/artists/${artistNameEncoded}/albums`
    const albumPageLink = `#/artists/${artistNameEncoded}/albums/${albumTitleEncoded}`

    const navSections = [
      { content: 'Artists' },
      { content: artistName, href: artistPageLink },
      { content: 'Albums', href: albumsPageLink },
      { content: albumTitle, href: albumPageLink },
      { content: 'Tags', active: true }
    ]

    this.props.setNavSections(navSections)
  }

  getData = page => {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const { artistName, albumTitle } = this.params()

    const url = `/lastfm/artists/${artistName}/albums/${albumTitle}/tags`
    const cancelToken = this.request.token
    const extra = { ...{ cancelToken } }

    const handleSuccess = resp => {
      const { album } = resp.data
      const { tags } = album

      const error = null

      this.setState({ ...{ tags, error } })

      this.setNavSections(album.artist, album.title)
    }

    const handleError = error => {
      const tags = null

      !axios.isCancel(error) && this.setState({ ...{ error, tags } })
    }

    const handleFinish = () => switchLoader(false)

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
  }

  tagsList () {
    const { tags, loading } = this.state

    const tagData = tag => (
      <Label key={uuid()} as={Link} to={`/tags/${tag.name}`}>
        {tag.name}
        <Label.Detail content={`${tag.percent}%`} />
      </Label>
    )
    const tagsListData = tags.map(tagData)
    const tagsData = <Label.Group size="large">{tagsListData}</Label.Group>

    return (
      <Segment className="pageSegment" {...{ loading }}>
        {tagsData}
      </Segment>
    )
  }

  render () {
    const { loading, tags, error } = this.state

    const tagsData = tags && this.tagsList()

    const errorData = error && <ErrorMessage {...{ error }} />

    const loaderData = loading && <LoaderDimmer />

    const contentData = tagsData || errorData || loaderData

    return <React.Fragment>{contentData}</React.Fragment>
  }
}
