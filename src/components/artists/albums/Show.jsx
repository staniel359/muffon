import React from 'react'
import { v4 as uuid } from 'uuid'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
import axios from 'axios'
import ErrorData from 'partials/ErrorData'
import LeftColumn from './columns/Left'
import RightColumn from './columns/Right'
import 'styles/artists/albums/Show.sass'

export default class Show extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false }
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    this.getInfo()
  }

  componentDidUpdate (prevProps, prevState) {
    const artistName = props => props.match.params.artistName
    const albumTitle = props => props.match.params.albumTitle

    const artistNameChanged = artistName(this.props) !== artistName(prevProps)
    const albumTitleChanged = albumTitle(this.props) !== albumTitle(prevProps)
    const albumChanged = artistNameChanged || albumTitleChanged

    albumChanged && this.getInfo()
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  getInfo () {
    const { params } = this.props.match

    this.setNavSections(
      decodeURIComponent(params.artistName),
      decodeURIComponent(params.albumTitle)
    )

    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const url = `/lastfm/artists/${params.artistName}/albums/${params.albumTitle}`
    const cancelToken = this.request.token
    const extra = { ...{ cancelToken } }

    const handleSuccess = resp => {
      const info = resp.data.album

      this.setState({ ...{ info } })
      this.setNavSections(info.artist, info.title)
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

  setNavSections (artistName, albumTitle) {
    const artistPageLink = `#/artists/${encodeURIComponent(artistName)}`
    const navSections = [
      { key: uuid(), content: 'Artists' },
      { key: uuid(), content: artistName, href: artistPageLink },
      { key: uuid(), content: 'Albums' },
      { key: uuid(), content: albumTitle, active: true }
    ]

    this.props.setNavSections(navSections)
  }

  albumData () {
    const { info } = this.state
    const { params } = this.props.match
    const columnProps = { info, params }

    return (
      <Segment className="albumPage">
        <LeftColumn {...columnProps} />
        <RightColumn {...columnProps} />
      </Segment>
    )
  }

  render () {
    const { loading, info, error } = this.state

    const loaderData = loading && (
      <Dimmer active inverted className="fixed" content={<Loader inverted />} />
    )

    const albumData = info && this.albumData()

    const errorData = error && <ErrorData {...{ error }} />

    const content = loaderData || albumData || errorData

    return <React.Fragment>{content}</React.Fragment>
  }
}
