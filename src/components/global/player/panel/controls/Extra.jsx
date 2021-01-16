import React from 'react'
import QueueButtonContext from './extra/QueueButtonContext'
import VolumeButtonContext from './extra/VolumeButtonContext'
import StopButtonContext from './extra/StopButtonContext'

export default class Extra extends React.PureComponent {
  render () {
    return (
      <div className="playerPanelExtraControls">
        <QueueButtonContext />
        <VolumeButtonContext />
        <StopButtonContext />
      </div>
    )
  }
}
