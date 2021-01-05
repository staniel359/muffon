import React from 'react'
import VolumeButtonContext from './extra/VolumeButtonContext'
import QueueButtonContext from './extra/QueueButtonContext'
import StopButtonContext from './extra/StopButtonContext'

export default class Extra extends React.PureComponent {
  render () {
    return (
      <div>
        <VolumeButtonContext />
        <QueueButtonContext />
        <StopButtonContext />
      </div>
    )
  }
}
