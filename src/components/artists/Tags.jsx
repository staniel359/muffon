import React from 'react'
import axios from 'axios'
import ErrorMessage from 'global/ErrorMessage'
import LoaderDimmer from 'global/LoaderDimmer'
import { Segment } from 'semantic-ui-react'
import Tags from 'global/Tags'

export default class ArtistTags extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }
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
    const isArtistChanged = artistName !== prevArtistName

    if (isArtistChanged) {
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
      { content: decodeURIComponent(artistName), href: artistPageLink },
      { content: 'Tags', active: true }
    ]

    this.props.setNavSections(navSections)
  }

  getData = page => {
    const switchLoader = isLoading => {
      this._isMounted && this.setState({ ...{ isLoading } })
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

  tagsData () {
    const { tags, isLoading } = this.state

    return (
      <Segment className="pageSegment" loading={isLoading}>
        <Tags {...{ tags }} />
      </Segment>
    )
  }

  render () {
    const { isLoading, tags, error } = this.state

    const tagsData = tags && this.tagsData()

    const errorData = error && <ErrorMessage {...{ error }} />

    const loaderData = isLoading && <LoaderDimmer />

    const contentData = tagsData || errorData || loaderData

    return <React.Fragment>{contentData}</React.Fragment>
  }
}
