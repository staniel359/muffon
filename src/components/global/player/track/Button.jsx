import React from 'react'
import { Button } from 'semantic-ui-react'

export default class TrackButton extends React.PureComponent {
  buttonIcon () {
    const { audioStatus, isPlaying, isError } = this.props

    const isPaused = audioStatus === 'pause'

    if (isPlaying) {
      return isPaused ? 'play' : 'pause'
    } else {
      return isError ? 'times' : 'play'
    }
  }

  render () {
    const { isLoading, isError } = this.props

    const isDisabled = isLoading || isError

    return (
      <div>
        <Button
          className="playButton"
          size="small"
          icon={this.buttonIcon()}
          loading={isLoading}
          disabled={isDisabled}
        />
      </div>
    )
  }
}
