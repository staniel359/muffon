import React from 'react'
import { Button } from 'semantic-ui-react'
import TimeBarContext from 'global/player/panel/TimeBarContext'

export default class PlayerPanel extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false, isError: false }
  }

  componentDidMount = () => (this._isMounted = true)

  componentWillUnmount = () => (this._isMounted = false)

  getData = () => {
    this.setState({ isLoading: true })

    const {
      artistName,
      trackTitle,
      trackId,
      getTrackData,
      updateCurrentTrack
    } = this.props

    const getTrackParams = { ...{ artistName, trackTitle } }

    const handleSuccess = () => {
      updateCurrentTrack({ id: trackId })

      this._isMounted && this.setState({ isLoading: false })
    }

    const handleError = () => {
      const errorState = { isError: true, isLoading: false }

      this._isMounted && this.setState(errorState)
    }

    getTrackData(getTrackParams).then(handleSuccess).catch(handleError)
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
        <TimeBarContext />
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
