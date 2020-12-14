import React from 'react'
import { List, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import getData from './functions/getData'
import formatSeconds from 'global/functions/formatSeconds'

export default class Track extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false, isError: false }

    this.getData = getData.bind(this)
  }

  componentDidMount = () => (this._isMounted = true)

  componentWillUnmount = () => (this._isMounted = false)

  getData = () => {
    const { track, getTrack, updateCurrentTrack } = this.props

    this.setState({ isLoading: true })

    const getTrackParams = {
      artistName: track.artist,
      trackTitle: track.title
    }

    const handleSuccess = () => {
      updateCurrentTrack({ id: track.id, isPlaying: true })

      this._isMounted && this.setState({ isLoading: false })
    }

    const handleError = () => {
      const errorState = { isError: true, isLoading: false }

      this._isMounted && this.setState(errorState)
    }

    getTrack(getTrackParams).then(handleSuccess).catch(handleError)
  }

  handleLinkClick = click => {
    click.stopPropagation()

    const { hideSearch } = this.props

    hideSearch && hideSearch()
  }

  artistData () {
    const { track } = this.props

    const artistNameEncoded = encodeURIComponent(track.artist)
    const artistPageLink = `/artists/${artistNameEncoded}`

    return (
      <List.Description>
        <Link
          className="trackContentLink"
          to={artistPageLink}
          onClick={this.handleLinkClick}
        >
          {track.artist}
        </Link>
      </List.Description>
    )
  }

  lengthData () {
    const { length } = this.props.track

    return (
      <List.Description
        className="trackContentLength"
        content={formatSeconds(length)}
      />
    )
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
      track,
      index,
      isPlaying,
      audioStatus,
      toggleAudio,
      isWithArtist
    } = this.props
    const { isLoading, isError } = this.state

    const handleTrackClick = () =>
      !isLoading && (isPlaying ? toggleAudio() : this.getData())

    const isDisabled = isLoading || isError
    const playButtonIcon = () => {
      const isPaused = audioStatus === 'pause'

      if (isPlaying) {
        return isPaused ? 'play' : 'pause'
      } else {
        return isError ? 'times' : 'play'
      }
    }

    const playButtonData = (
      <div>
        <Button
          className="playButton"
          size="small"
          icon={playButtonIcon()}
          loading={isLoading}
          disabled={isDisabled}
        />
      </div>
    )

    const indexData = index >= 0 && (
      <div className="trackContentIndex">{`${index + 1}.`}</div>
    )

    const artistNameEncoded = encodeURIComponent(track.artist)
    const trackTitleEncoded = encodeURIComponent(track.title)
    const trackPageLink = `/artists/${artistNameEncoded}/tracks/${trackTitleEncoded}`
    const titleArtistData = (
      <div>
        <List.Header as="h4">
          <Link
            className="trackContentLink"
            to={trackPageLink}
            onClick={this.handleLinkClick}
          >
            {track.title}
          </Link>
        </List.Header>

        {isWithArtist && this.artistData()}
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
      <List.Item
        className="track"
        onClick={handleTrackClick}
        active={isPlaying}
      >
        {playButtonData}
        {trackData}
      </List.Item>
    )
  }
}
