import React from 'react'
import { Button } from 'semantic-ui-react'
import TimeBarContextWrap from 'global/player/audio/TimeBarContextWrap'

export default class Player extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false, isError: false }
  }

  componentDidMount = () => (this._isMounted = true)

  componentWillUnmount = () => (this._isMounted = false)

  getData = () => {
    const switchLoader = isLoading => {
      this._isMounted && this.setState({ ...{ isLoading } })
    }

    switchLoader(true)

    const {
      artistName,
      trackTitle,
      trackId,
      getTrackData,
      setCurrentTrackId
    } = this.props

    const getTrackParams = { ...{ artistName, trackTitle } }

    const handleSuccess = () => setCurrentTrackId(trackId)

    const handleError = () => this.setState({ isError: true })

    const handleFinish = () => switchLoader(false)

    getTrackData(getTrackParams)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
  }

  render () {
    const { isLoading, isError } = this.state
    const { isPlaying, toggleAudio, audioStatus, length } = this.props

    const playButtonIcon = () => {
      const paused = audioStatus === 'pause'

      if (isPlaying) {
        return paused ? 'play' : 'pause'
      } else {
        return isError ? 'times' : 'play'
      }
    }

    const handleTrackClick = () =>
      !isLoading && (isPlaying ? toggleAudio() : this.getData())

    const isDisabled = isLoading || isError

    const playButtonData = (
      <Button
        basic
        size="large"
        className="trackPagePlayerPlayButton"
        icon={playButtonIcon()}
        onClick={handleTrackClick}
        loading={isLoading}
        disabled={isDisabled}
      />
    )

    const placeholderData = (
      <div className="trackPagePlayerPlaceholder" onClick={handleTrackClick}>
        Click to play
      </div>
    )

    const timeBarData = (
      <div className="trackPagePlayerTimeBar">
        <TimeBarContextWrap />
      </div>
    )

    const timeBarPlaceholderData = isPlaying ? timeBarData : placeholderData

    const lengthFormatted = new Date(length * 1000).toISOString().substr(14, 5)
    const lengthData = length > 0 && (
      <div className="trackPagePlayerLength">{lengthFormatted}</div>
    )

    return (
      <div className="trackPagePlayer">
        {playButtonData}
        {timeBarPlaceholderData}
        {lengthData}
      </div>
    )
  }
}
