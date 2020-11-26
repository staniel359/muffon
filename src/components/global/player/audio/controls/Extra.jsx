import React from 'react'
import VolumeButton from './extra/Volume'
import ChangeTrackButton from './extra/ChangeTrack'
import StopButton from './extra/Stop'
import PlayerContext from 'contexts/PlayerContext'

export default class Extra extends React.PureComponent {
  render () {
    const volumeButtonData = (
      <PlayerContext.Consumer>
        {context => {
          const { toggleMute, muted, volume, changeVolume } = context
          const volumeProps = { toggleMute, muted, volume, changeVolume }

          return <VolumeButton {...volumeProps} />
        }}
      </PlayerContext.Consumer>
    )

    const changeTrackButtonData = (
      <PlayerContext.Consumer>
        {context => {
          const { currentTrackData, getTrackData } = context
          const changeTrackButtonProps = { currentTrackData, getTrackData }

          return <ChangeTrackButton {...changeTrackButtonProps} />
        }}
      </PlayerContext.Consumer>
    )

    const stopButtonData = (
      <PlayerContext.Consumer>
        {context => {
          const { stopAudio } = context
          const stopButtonProps = { stopAudio }

          return <StopButton {...stopButtonProps} />
        }}
      </PlayerContext.Consumer>
    )

    return (
      <React.Fragment>
        {volumeButtonData}
        {changeTrackButtonData}
        {stopButtonData}
      </React.Fragment>
    )
  }
}
