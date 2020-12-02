import React from 'react'
import axios from 'axios'
import ErrorData from 'partials/ErrorData'
import LoaderDimmer from 'partials/LoaderDimmer'
import { Segment, Label } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import { Link } from 'react-router-dom'
import 'styles/artists/tags/Show.sass'

export default class Tags extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false }
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    this.setNavSections(this.params().artistName)
    this.getData()
  }

  componentDidUpdate (prevProps, prevState) {
    this.handleArtistChange(prevProps)
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  params = () => this.props.match.params

  handleArtistChange (prevProps) {
    const { artistName } = this.params()

    const prevArtistName = prevProps.match.params.artistName
    const artistChanged = artistName !== prevArtistName

    if (artistChanged) {
      this.setNavSections(artistName)
      this.setState({ tags: null })
      this.getData()
    }
  }

  setNavSections (artistName) {
    const artistNameEncoded = encodeURIComponent(artistName)
    const artistPageLink = `#/artists/${artistNameEncoded}`
    const navSections = [
      { content: 'Artists' },
      { content: artistName, href: artistPageLink },
      { content: 'Tags', active: true }
    ]

    this.props.setNavSections(navSections)
  }

  getData = page => {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const url = `/lastfm/artists/${this.params().artistName}/tags`
    const cancelToken = this.request.token
    const extra = { ...{ cancelToken } }

    const handleSuccess = resp => {
      const { artist } = resp.data
      const { tags } = artist

      const error = null

      this.setState({ ...{ tags, error } })

      this.setNavSections(artist.name)
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
      <Segment className="tagsPage" {...{ loading }}>
        {tagsData}
      </Segment>
    )
  }

  render () {
    const { loading, tags, error } = this.state

    const tagsData = tags && this.tagsList()

    const errorData = error && <ErrorData {...{ error }} />

    const loaderData = loading && <LoaderDimmer />

    const contentData = tagsData || errorData || loaderData

    return <React.Fragment>{contentData}</React.Fragment>
  }
}
