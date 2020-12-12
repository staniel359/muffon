import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import VolumeButton from './VolumeButton'

export default class VolumeButtonContext extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { toggleMute, isMuted, volume, changeVolume } = context

          const volumeProps = { toggleMute, isMuted, volume, changeVolume }

          return <VolumeButton {...volumeProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
