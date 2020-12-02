import React from 'react'
import { List, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import 'styles/global/Track.sass'

export default class Track extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false, error: false }
  }

  componentDidMount () {
    this._isMounted = true
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  getData = () => {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
    }

    switchLoader(true)

    const { artistName, track, getTrackData, setCurrentTrackId } = this.props

    const trackTitle = track.title
    const getTrackParams = { ...{ artistName, trackTitle } }

    const trackId = track.id
    const handleSuccess = () => setCurrentTrackId(trackId)

    const handleError = () => this.setState({ error: true })

    const handleFinish = () => switchLoader(false)

    getTrackData(getTrackParams)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
  }

  handleLinkClick = click => {
    click.stopPropagation()

    const { hideSearch } = this.props

    hideSearch && hideSearch()
  }

  artistData () {
    const { artistName } = this.props

    const artistNameEncoded = encodeURIComponent(artistName)
    const artistPageLink = `/artists/${artistNameEncoded}`

    return (
      <List.Description>
        <Link
          className="trackContentLink"
          to={artistPageLink}
          onClick={this.handleLinkClick}
        >
          {artistName}
        </Link>
      </List.Description>
    )
  }

  lengthData () {
    const format = seconds =>
      new Date(seconds * 1000).toISOString().substr(14, 5)
    const length = format(this.props.track.length)

    return <List.Description className="trackContentLength" content={length} />
  }

  counterData () {
    const { track, topTrackCount } = this.props

    const listenersCount = track.listeners_count
    const trackLineWidth = `${(listenersCount / topTrackCount) * 70}%`
    const trackLineStyle = { width: trackLineWidth }

    const trackCounterData = listenersCount.toLocaleString('eu')

    return (
      <List.Description className="trackContentCounter">
        <div className="trackContentCounterLine" style={trackLineStyle} />
        <div className="trackContentCounterData">
          <Icon name="user" size="small" />
          {trackCounterData}
        </div>
      </List.Description>
    )
  }

  render () {
    const {
      artistName,
      track,
      index,
      playing,
      audioStatus,
      toggleAudio,
      artist
    } = this.props
    const { loading, error } = this.state

    const trackTitle = track.title

    const handleTrackClick = () =>
      !loading && (playing ? toggleAudio() : this.getData())

    const active = loading || playing
    const disabled = loading || error
    const playButtonIcon = () => {
      const paused = audioStatus === 'pause'

      if (playing) {
        return paused ? 'play' : 'pause'
      } else {
        return error ? 'times' : 'play'
      }
    }

    const playButtonData = (
      <Button size="small" icon={playButtonIcon()} {...{ loading, disabled }} />
    )

    const indexData = index >= 0 && (
      <div className="trackContentIndex">{`${index + 1}.`}</div>
    )

    const artistNameEncoded = encodeURIComponent(artistName)
    const trackTitleEncoded = encodeURIComponent(trackTitle)
    const trackPageLink = `/artists/${artistNameEncoded}/tracks/${trackTitleEncoded}`
    const titleArtistData = (
      <div>
        <List.Header as="h4">
          <Link
            className="trackContentLink"
            to={trackPageLink}
            onClick={this.handleLinkClick}
          >
            {trackTitle}
          </Link>
        </List.Header>

        {artist && this.artistData()}
      </div>
    )

    const trackData = (
      <List.Content className="trackContent">
        <div className="trackContentMain">
          <div className="trackContentIndexLink">
            {indexData}

            {titleArtistData}
          </div>

          {track.length && this.lengthData()}
        </div>

        {track.listeners_count && this.counterData()}
      </List.Content>
    )

    return (
      <List.Item className="track" onClick={handleTrackClick} {...{ active }}>
        <div className="playButton">{playButtonData}</div>

        {trackData}
      </List.Item>
    )
  }
}
