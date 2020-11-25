import React from 'react'
import VolumeButton from './extra/Volume'
import ChangeButton from './extra/Change'
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

        <ChangeButton />

        {stopButtonData}
      </React.Fragment>
    )
  }
}
