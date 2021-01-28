import React from 'react'
import { Button } from 'semantic-ui-react'

export default class TrackButton extends React.PureComponent {
  contentData () {
    const { isLoading, isError } = this.props

    const isDisabled = isLoading || isError

    return (
      <Button
        className="playButton"
        icon={this.iconData()}
        loading={isLoading}
        disabled={isDisabled}
      />
    )
  }

  iconData () {
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
    const contentData = isVisible && this.contentData()

    return <div className="playButtonWrap">{contentData}</div>
  }
}
