import React from 'react'
import { Button } from 'semantic-ui-react'

export default class PlayButton extends React.PureComponent {
  render () {
    const { toggleAudio, audioStatus, isLoading } = this.props

    const toggleAudioButtonIcon = () => {
      switch (audioStatus) {
        case 'play':
          return 'pause'
        case 'pause':
          return 'play'
        default:
          return 'pause'
      }
    }

    return (
      <Button
        basic
        onClick={toggleAudio}
        icon={toggleAudioButtonIcon()}
        loading={isLoading}
        disabled={isLoading}
      />
    )
  }
}
