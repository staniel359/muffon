import React from 'react'
import LeftColumn from './show/columns/Left'
import RightColumn from './show/columns/Right'
import ErrorMessage from 'global/ErrorMessage'
import LoaderDimmer from 'global/LoaderDimmer'
import axios from 'axios'
import 'styles/Artists.sass'

export default class Show extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false }
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    this.setNavSections(this.params().artistName)
    this.setArtistName()
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
      this.setState({ artistName: null })
      this.setArtistName()
    }
  }

  setArtistName () {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const url = `/lastfm/artists/${this.params().artistName}`
    const cancelToken = this.request.token
    const extra = { ...{ cancelToken } }

    const handleSuccess = resp => {
      const artistName = resp.data.artist.name

      this.setState({ ...{ artistName } })
      this.setNavSections(artistName)
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

  setNavSections (artistName) {
    const navSections = [
      { content: 'Artists' },
      { content: artistName, active: true }
    ]

    this.props.setNavSections(navSections)
  }

  artistData () {
    const { artistName } = this.state

    const infoRef = React.createRef()
    const tracksRef = React.createRef()
    const albumsRef = React.createRef()
    const similarRef = React.createRef()

    const refs = { infoRef, tracksRef, albumsRef, similarRef }

    const segment = name => refs[`${name}Ref`]
    const segmentTop = name => segment(name).current.offsetTop - 60
    const scrollToTop = name => window.scrollTo(0, segmentTop(name))

    const leftColumnProps = { artistName, scrollToTop, segmentTop }
    const rightColumnProps = { artistName, scrollToTop, refs }

    return (
      <React.Fragment>
        <LeftColumn {...leftColumnProps} />
        <RightColumn {...rightColumnProps} />
      </React.Fragment>
    )
  }

  render () {
    const { error, loading, artistName } = this.state

    const artistData = artistName && this.artistData()

    const errorData = error && <ErrorMessage {...{ error }} />

    const loaderData = loading && <LoaderDimmer />

    const contentData = artistData || errorData || loaderData

    return <React.Fragment>{contentData}</React.Fragment>
  }
}
