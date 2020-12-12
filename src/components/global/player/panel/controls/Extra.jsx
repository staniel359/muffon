import React from 'react'
import VolumeButtonContext from './extra/VolumeButtonContext'
import ChangeTrackButtonContext from './extra/ChangeTrackButtonContext'
import StopButtonContext from './extra/StopButtonContext'

export default class Extra extends React.PureComponent {
  render () {
    return (
      <React.Fragment>
        <VolumeButtonContext />
        <ChangeTrackButtonContext />
        <StopButtonContext />
      </React.Fragment>
    )
  }
}
