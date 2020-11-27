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

    this.setNavSections()
    this.getInfo()
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  setNavSections () {
    const { params } = this.props.match

    const navSections = [
      { key: uuid(), content: 'Artists' },
      {
        key: uuid(),
        content: decodeURIComponent(params.artistName),
        href: `#/artists/${params.artistName}`
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

  getInfo () {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const { params } = this.props.match

    const url = `/lastfm/artists/${params.artistName}/albums/${params.albumTitle}`
    const cancelToken = this.request.token
    const extra = { ...{ cancelToken } }

    const handleSuccess = resp => this.setState({ info: resp.data.album })

    const handleError = error => {
      !axios.isCancel(error) && this.setState({ ...{ error } })
    }

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(() => switchLoader(false))
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

    const albumData = info && this.albumData()

    const errorData = error && <ErrorData {...{ error }} />

    const loaderData = loading && (
      <Dimmer active inverted className="fixed" content={<Loader inverted />} />
    )

    const content = albumData || errorData || loaderData

    return <React.Fragment>{content}</React.Fragment>
  }
}
