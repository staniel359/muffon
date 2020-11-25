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
    this.state = { loading: true }
  }

  componentDidMount () {
    this.request = axios.CancelToken.source()

    this.setNavSections()
    this.getAlbumInfo()
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  setNavSections () {
    const { params } = this.props.match

    const navSections = [
      { key: uuid(), content: 'Artists' },
      {
        key: uuid(),
        content: decodeURIComponent(params.artistName),
        href: `#/artists/${params.artistName}`,
        active: true
      },
      { key: uuid(), content: 'Albums' },
      {
        key: uuid(),
        content: decodeURIComponent(params.albumTitle),
        active: true
      }
    ]

    this.props.setNavSections(navSections)
  }

  getAlbumInfo () {
    const { params } = this.props.match

    const url = `/lastfm/artists/${params.artistName}/albums/${params.albumTitle}`
    const extra = { cancelToken: this.request.token }

    const handleSuccess = resp => this.setState({ info: resp.data.album })

    const handleError = error => this.setState({ error: error })

    const switchLoader = bool => this.setState({ loading: !!bool })

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(switchLoader)
  }

  pageData () {
    const { info } = this.state
    const { params } = this.props.match

    return (
      <Segment className="albumPage">
        <LeftColumn {...{ info, params }} />

        <RightColumn {...{ info, params }} />
      </Segment>
    )
  }

  render () {
    const { loading, info, error } = this.state

    const loader = loading && (
      <Dimmer active inverted className="fixed" content={<Loader inverted />} />
    )

    const successData = info && (
      <React.Fragment>{this.pageData()}</React.Fragment>
    )

    const errorData = error && <ErrorData {...{ error }} />

    const pageData = loader || successData || errorData

    return <React.Fragment>{pageData}</React.Fragment>
  }
}
