import React from 'react'
import axios from 'axios'
import { Loader } from 'semantic-ui-react'

export default class ListenersCount extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false, listenersCount: 0 }
  }

  componentDidMount () {
    this.request = axios.CancelToken.source()

    this.getData()
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  getData () {
    this.setState({ isLoading: true })

    const { artistName, albumTitle } = this.props

    const artistNameEncoded = encodeURIComponent(artistName)
    const albumTitleEncoded = encodeURIComponent(albumTitle)
    const url =
      `/lastfm/artists/${artistNameEncoded}` +
      `/albums/${albumTitleEncoded}/listeners_count`
    const cancelToken = this.request.token
    const extra = { cancelToken }

    const handleSuccess = resp => {
      const listenersCount = resp.data.listeners_count

      const successState = { listenersCount, isLoading: false }

      this.setState(successState)
    }

    const handleError = error => {
      const errorState = { listenersCount: 0, isLoading: false }

      !axios.isCancel(error) && this.setState(errorState)
    }

    axios.get(url, extra).then(handleSuccess).catch(handleError)
  }

  render () {
    const { isLoading, listenersCount } = this.state

    const loaderData = isLoading && <Loader active inline size="mini" />

    const listenersData = (
      <div>{listenersCount.toLocaleString('eu') + ' listeners'}</div>
    )

    const contentData = loaderData || listenersData

    return <React.Fragment>{contentData}</React.Fragment>
  }
}
