import React from 'react'
import { Button } from 'semantic-ui-react'
import TimeBarContext from './panel/TimeBarContext'
import getData from './functions/getData'
import formatSeconds from 'global/functions/formatSeconds'

export default class TrackPlayerPanel extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false, isError: false }

    this.getData = getData.bind(this)
  }

  componentDidMount = () => (this._isMounted = true)

  componentWillUnmount = () => (this._isMounted = false)

  playButtonData () {
    const { isLoading, isError } = this.state

    const isDisabled = isLoading || isError

    return (
      <Button
        basic
        size="large"
        className="trackPagePlayerPlayButton"
        icon={this.playButtonIcon()}
        onClick={this.handleClick}
        loading={isLoading}
        disabled={isDisabled}
      />
    )
  }

  playButtonIcon () {
    const { isError } = this.state
    const { isPlaying, audioStatus } = this.props

    const paused = audioStatus === 'pause'

    if (isPlaying) {
      return paused ? 'play' : 'pause'
    } else {
      return isError ? 'times' : 'play'
    }
  }

  handleClick = () => {
    const { isLoading } = this.state
    const { isPlaying, toggleAudio } = this.props

    if (!isLoading) {
      isPlaying ? toggleAudio() : this.getData()
    }
  }

  timeBarPlaceholderData () {
    const { isPlaying } = this.props

    const timeBarData = (
      <div className="trackPagePlayerTimeBar">
        <TimeBarContext />
      </div>
    )

    const placeholderData = (
      <div className="trackPagePlayerPlaceholder" onClick={this.handleClick}>
        Click to play
      </div>
    )

    return isPlaying ? timeBarData : placeholderData
  }

  render () {
    const { length } = this.props.track

    const lengthData = length > 0 && (
      <div className="trackPagePlayerLength">{formatSeconds(length)}</div>
    )

    return (
      <div className="trackPagePlayer">
        {this.playButtonData()}
        {this.timeBarPlaceholderData()}
        {lengthData}
      </div>
    )
  }
}
