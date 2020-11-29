import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import VolumeButton from './Volume'

export default class VolumeContextWrap extends React.PureComponent {
  render () {
    return (
      <PlayerContext.Consumer>
        {context => {
          const { toggleMute, muted, volume, changeVolume } = context
          const volumeProps = { toggleMute, muted, volume, changeVolume }

          return <VolumeButton {...volumeProps} />
        }}
      </PlayerContext.Consumer>
    )
  }
}
