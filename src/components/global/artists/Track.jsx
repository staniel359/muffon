import React from 'react'
import { List, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Track extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false, isError: false }
  }

  componentDidMount = () => (this._isMounted = true)

  componentWillUnmount = () => (this._isMounted = false)

  getData = () => {
    this.setState({ isLoading: true })

    const { artistName, track, getTrackData, setCurrentTrackId } = this.props

    const trackTitle = track.title
    const getTrackParams = { ...{ artistName, trackTitle } }

    const handleSuccess = () => {
      setCurrentTrackId(track.id)

      this._isMounted && this.setState({ isLoading: false })
    }

    const handleError = () => {
      const errorState = { isError: true, isLoading: false }

      this._isMounted && this.setState(errorState)
    }

    getTrackData(getTrackParams).then(handleSuccess).catch(handleError)
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
    const { length } = this.props.track

    const lengthFormatted = new Date(length * 1000).toISOString().substr(14, 5)

    return (
      <List.Description
        className="trackContentLength"
        content={lengthFormatted}
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
      artistName,
      track,
      index,
      isPlaying,
      audioStatus,
      toggleAudio,
      artist
    } = this.props
    const { isLoading, isError } = this.state

    const trackTitle = track.title

    const handleTrackClick = () =>
      !isLoading && (isPlaying ? toggleAudio() : this.getData())

    const isActive = isLoading || isPlaying
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
      <List.Item className="track" onClick={handleTrackClick} active={isActive}>
        {playButtonData}
        {trackData}
      </List.Item>
    )
  }
}
