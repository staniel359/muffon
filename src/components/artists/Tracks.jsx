import React from 'react'
import { v4 as uuid } from 'uuid'
import { Segment, Dimmer, Loader, List, Pagination } from 'semantic-ui-react'
import axios from 'axios'
import Track from 'global/artists/Track'
import ErrorData from 'partials/ErrorData'
import PlayerContext from 'contexts/PlayerContext'

export default class Tracks extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { currentPage: 1 }
  }

  componentDidMount () {
    this.request = axios.CancelToken.source()

    this.setNavSections()
    this.getTracks()
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
        href: `#/artists/${params.artistName}`
      },
      { key: uuid(), content: 'Tracks', active: true }
    ]

    this.props.setNavSections(navSections)
  }

  getTracks = newPage => {
    const switchLoader = bool => this.setState({ loading: !!bool })

    switchLoader(true)

    const artistNameEncoded = this.props.match.params.artistName

    const url = `/lastfm/artists/${artistNameEncoded}/tracks`
    const params = { limit: 50, page: newPage }
    const extra = { params: params, cancelToken: this.request.token }

    const handleSuccess = resp => {
      const { topTrackCount } = this.state
      const { artist } = resp.data

      const firstTrackCount = artist.tracks[0].listeners_count

      this.setState({
        tracks: artist.tracks,
        topTrackCount: topTrackCount || firstTrackCount,
        totalPages: artist.total_pages,
        error: null,
        page: newPage
      })
    }

    const handleError = error => {
      this.setState({ error: error, tracks: null })
    }

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(switchLoader)
  }

  pageData () {
    const {
      tracks,
      loading,
      topTrackCount,
      currentPage,
      totalPages
    } = this.state
    const { params } = this.props.match

    const trackData = track => (
      <PlayerContext.Consumer key={uuid()}>
        {context => {
          const artistName = decodeURIComponent(params.artistName)
          const trackProps = { track, artistName, topTrackCount }

          const isPlaying = context.currentTrackId === track.id
          const trackGlobalProps = { isPlaying }

          return <Track {...trackProps} {...trackGlobalProps} />
        }}
      </PlayerContext.Consumer>
    )
    const tracksList = tracks.map(trackData)

    const handlePageChange = (_, { activePage }) => {
      window.scrollTo(0, 0)
      this.getTracks(activePage)
    }
    const paginationProps = {
      defaultActivePage: currentPage,
      totalPages: totalPages,
      onPageChange: handlePageChange,
      firstItem: null,
      lastItem: null,
      siblingRange: 0
    }
    const paginationData = tracks && <Pagination {...paginationProps} />

    return (
      <Segment.Group>
        <Segment loading={loading}>
          <List selection content={tracksList} />
        </Segment>

        <Segment className="artistPagePaginationWrap">{paginationData}</Segment>
      </Segment.Group>
    )
  }

  render () {
    const { loading, tracks, error } = this.state

    const successData = tracks && this.pageData()

    const errorData = error && <ErrorData {...{ error }} />

    const loaderData = loading && (
      <Dimmer active inverted className="fixed" content={<Loader inverted />} />
    )

    const pageData = successData || errorData || loaderData

    return <React.Fragment>{pageData}</React.Fragment>
  }
}
