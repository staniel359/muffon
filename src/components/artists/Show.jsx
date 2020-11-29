import React from 'react'
import LeftColumn from './show/columns/Left'
import RightColumn from './show/columns/Right'
import ErrorData from 'partials/ErrorData'
import { Dimmer, Loader } from 'semantic-ui-react'
import axios from 'axios'
import 'styles/artists/Show.sass'

export default class Show extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false }
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    this.setArtistName()
  }

  componentDidUpdate (prevProps, prevState) {
    const artistName = props => props.match.params.artistName

    const artistChanged = artistName(this.props) !== artistName(prevProps)

    artistChanged && this.setArtistName()
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  setArtistName () {
    const { params } = this.props.match

    this.setNavSections(decodeURIComponent(params.artistName))

    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const url = `/lastfm/artists/${params.artistName}`
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

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(() => switchLoader(false))
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

    const segmentTop = segmentID =>
      document.getElementById(segmentID).offsetTop - 60
    const scrollToSegmentTop = segmentID =>
      window.scrollTo(0, segmentTop(segmentID))

    const leftColumnProps = { artistName, scrollToSegmentTop, segmentTop }
    const rightColumnProps = { artistName, scrollToSegmentTop }

    return (
      <React.Fragment>
        <LeftColumn {...leftColumnProps} />
        <RightColumn {...rightColumnProps} />
      </React.Fragment>
    )
  }

  render () {
    const { error, loading, artistName } = this.state

    const loaderData = loading && (
      <Dimmer active inverted className="fixed" content={<Loader inverted />} />
    )

    const artistData = artistName && this.artistData()

    const errorData = error && <ErrorData {...{ error }} />

    const content = loaderData || artistData || errorData

    return <React.Fragment>{content}</React.Fragment>
  }
}
