import React from 'react'
import { Button } from 'semantic-ui-react'
import GetTrackButton from './GetTrack'
import PlayerContext from 'contexts/PlayerContext'

export default class Play extends React.PureComponent {
  render () {
    const {
      artistName,
      trackTitle,
      trackId,
      isPlaying,
      toggleAudio,
      audioStatus
    } = this.props

    const icon = () => {
      switch (audioStatus) {
        case 'play':
          return 'pause'
        case 'pause':
          return 'play'
        default:
          return 'pause'
      }
    }
    const toggleAudioButtonData = (
      <Button size="small" onClick={toggleAudio} icon={icon()} />
    )

    const getTrackButtonProps = { artistName, trackTitle, trackId }
    const getTrackButtonData = (
      <PlayerContext.Consumer>
        {context => {
          const { setCurrentTrackId, getTrackData } = context
          const getTrackButtonGlobalProps = { setCurrentTrackId, getTrackData }

          return (
            <GetTrackButton
              {...getTrackButtonProps}
              {...getTrackButtonGlobalProps}
            />
          )
        }}
      </PlayerContext.Consumer>
    )

    const playButtonData = isPlaying
      ? toggleAudioButtonData
      : getTrackButtonData

    return <div className="playButton">{playButtonData}</div>
  }
}
