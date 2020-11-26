import React from 'react'
import { List, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import 'styles/global/Track.sass'

export default class Track extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false, error: false }
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
      <Link
        className="trackContentLink"
        to={artistPageLink}
        onClick={this.handleLinkClick}
      >
        <List.Description content={artistName} />
      </Link>
    )
  }

  lengthData () {
    const { track } = this.props

    const format = seconds =>
      new Date(seconds * 1000).toISOString().substr(14, 5)
    const trackLength = format(track.length)

    return (
      <List.Description className="trackContentLength" content={trackLength} />
    )
  }

  counterData () {
    const { track, topTrackCount } = this.props

    const listenersCount = track.listeners_count
    const trackLineWidth = `${(listenersCount / topTrackCount) * 70}%`

    const trackCounterData = listenersCount.toLocaleString('eu')

    return (
      <List.Description className="trackContentCounter">
        <div
          className="trackContentCounterLine"
          style={{ width: trackLineWidth }}
        />
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
      setCurrentTrackId,
      getTrackData,
      artist
    } = this.props
    const { loading, error } = this.state

    const trackTitle = track.title
    const trackId = track.id
    const getTrack = () => {
      const switchLoader = bool => this.setState({ loading: !!bool })

      switchLoader(true)

      const getTrackParams = { artistName, trackTitle }

      const handleSuccess = () => setCurrentTrackId(trackId)
      const handleError = () => this.setState({ error: true })

      getTrackData({ ...getTrackParams })
        .then(handleSuccess)
        .catch(handleError)
        .then(switchLoader)
    }

    const handleTrackClick = () =>
      !loading && (playing ? toggleAudio() : getTrack())

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
        <Link
          className="trackContentLink"
          to={trackPageLink}
          onClick={this.handleLinkClick}
        >
          <List.Header as="h4" content={trackTitle} />
        </Link>

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
