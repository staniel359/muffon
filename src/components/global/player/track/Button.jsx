import React from 'react'
import { Button } from 'semantic-ui-react'

export default class TrackButton extends React.PureComponent {
  buttonData () {
    const { isLoading, isError } = this.props

    const isDisabled = isLoading || isError

    return (
      <Button
        className="playButton"
        icon={this.buttonIcon()}
        loading={isLoading}
        disabled={isDisabled}
      />
    )
  }

  buttonIcon () {
    const { isPlaying, audioStatus, isError } = this.props

    const isPaused = audioStatus === 'pause'

    if (isPlaying) {
      return isPaused ? 'play' : 'pause'
    } else {
      return isError ? 'times' : 'play'
    }
  }

  render () {
    const { isHovered, isLoading, isError, isPlaying } = this.props

    const isVisible = isHovered || isLoading || isError || isPlaying
    const buttonData = isVisible && this.buttonData()

    return <div className="playButtonWrap">{buttonData}</div>
  }
}
