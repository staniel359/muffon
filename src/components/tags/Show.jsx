import React from 'react'
import Info from './Info'
import Artists from './Artists'
import Albums from './Albums'
import Tracks from './Tracks'
import axios from 'axios'
import ErrorMessage from 'partials/ErrorMessage'
import LoaderDimmer from 'partials/LoaderDimmer'
import 'styles/tags/Show.sass'

export default class Show extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false }
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    this.setNavSections(this.params().tagName)
    this.setTagName()
  }

  componentDidUpdate (prevProps, prevState) {
    this.handleTagChange(prevProps)
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  params = () => this.props.match.params

  handleTagChange (prevProps) {
    const { tagName } = this.params()

    const prevTagName = prevProps.match.params.tagName
    const tagChanged = tagName !== prevTagName

    if (tagChanged) {
      this.setNavSections(tagName)
      this.setState({ tagName: null, artistImages: null })
      this.setTagName()
    }
  }

  setNavSections (tagName) {
    const navSections = [
      { content: 'Tags' },
      { content: tagName, active: true }
    ]

    this.props.setNavSections(navSections)
  }

  setTagName () {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const url = `/lastfm/tags/${this.params().tagName}`
    const cancelToken = this.request.token
    const extra = { ...{ cancelToken } }

    const handleSuccess = resp => {
      const tagName = resp.data.tag.name

      this.setState({ ...{ tagName } })
      this.setNavSections(tagName)
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

  tagData () {
    const { tagName, artistImages } = this.state
    const { scrollToSegmentTop } = this

    const setArtistImages = images => {
      !artistImages && this.setState({ artistImages: images })
    }

    const infoProps = { tagName, artistImages }
    const artistsProps = { tagName, setArtistImages, scrollToSegmentTop }
    const albumsProps = { tagName, scrollToSegmentTop }
    const tracksProps = { tagName, scrollToSegmentTop }

    return (
      <div className="tagPage">
        <Info {...infoProps} />
        <Artists {...artistsProps} />
        <Albums {...albumsProps} />
        <Tracks {...tracksProps} />
      </div>
    )
  }

  scrollToSegmentTop = segment => {
    const segmentTop = segment.current.offsetTop - 60

    window.scrollTo(0, segmentTop)
  }

  render () {
    const { tagName, error, loading } = this.state

    const tagData = tagName && this.tagData()

    const errorData = error && <ErrorMessage {...{ error }} />

    const loaderData = loading && <LoaderDimmer />

    const contentData = tagData || errorData || loaderData

    return <React.Fragment>{contentData}</React.Fragment>
  }
}
