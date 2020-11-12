import React from 'react'
import { Button } from 'semantic-ui-react'
import PlayerContext from 'contexts/PlayerContext'
import GetTrackButton from './GetTrack'

export default class Play extends React.PureComponent {
  static contextType = PlayerContext

  render () {
    const { currentTrackId, toggleAudio, toggleAudioButtonIcon } = this.context
    const { artistName, trackTitle, trackId } = this.props

    const isPlaying = currentTrackId === trackId

    const toggleAudioButton = (
      <Button
        size="small"
        onClick={toggleAudio}
        icon={toggleAudioButtonIcon()}
      />
    )

    const getTrackButtonProps = { artistName, trackTitle, trackId }
    const getTrackButton = <GetTrackButton {...getTrackButtonProps} />

    const playButtonData = isPlaying ? toggleAudioButton : getTrackButton

    return <div className="playButton">{playButtonData}</div>
  }
}
