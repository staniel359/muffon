import React from 'react'
import { Button } from 'semantic-ui-react'
import TimeBarContextWrap from 'global/player/audio/TimeBarContextWrap'

export default class Player extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false, error: false }
  }

  componentDidMount = () => (this._isMounted = true)

  componentWillUnmount = () => (this._isMounted = false)

  getData = () => {
    const switchLoader = loading => {
      this._isMounted && this.setState({ ...{ loading } })
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

    const handleError = () => this.setState({ error: true })

    const handleFinish = () => switchLoader(false)

    getTrackData(getTrackParams)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
  }

  render () {
    const { loading, error } = this.state
    const { playing, toggleAudio, audioStatus, length } = this.props

    const playButtonIcon = () => {
      const paused = audioStatus === 'pause'

      if (playing) {
        return paused ? 'play' : 'pause'
      } else {
        return error ? 'times' : 'play'
      }
    }

    const handleTrackClick = () =>
      !loading && (playing ? toggleAudio() : this.getData())

    const disabled = loading || error

    const playButtonData = (
      <Button
        basic
        size="large"
        className="trackPagePlayerPlayButton"
        icon={playButtonIcon()}
        onClick={handleTrackClick}
        {...{ loading, disabled }}
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

    const timeBarPlaceholderData = playing ? timeBarData : placeholderData

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
