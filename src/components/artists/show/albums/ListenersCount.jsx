import React from 'react'
import axios from 'axios'
import { Loader } from 'semantic-ui-react'

export default class ListenersCount extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false }
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    this.getData()
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  getData () {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const { artistName, albumTitle } = this.props

    const artistNameEncoded = encodeURIComponent(artistName)
    const albumTitleEncoded = encodeURIComponent(albumTitle)
    const url =
      `/lastfm/artists/${artistNameEncoded}` +
      `/albums/${albumTitleEncoded}/listeners_count`
    const cancelToken = this.request.token
    const extra = { ...{ cancelToken } }

    const handleSuccess = resp => {
      const listenersCount = resp.data.listeners_count

      this.setState({ ...{ listenersCount } })
    }

    const handleError = error => {
      !axios.isCancel(error) && this.setState({ listenersCount: 0 })
    }

    const handleFinish = () => switchLoader(false)

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
  }

  render () {
    const { loading, listenersCount } = this.state

    const loaderData = loading && <Loader active inline size="mini" />

    const listenersData = listenersCount && listenersCount.toLocaleString('eu')

    const contentData = loaderData || listenersData

    return <React.Fragment>{contentData}</React.Fragment>
  }
}
