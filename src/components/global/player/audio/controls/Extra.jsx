import React from 'react'
import VolumeButtonContextWrap from './extra/VolumeContextWrap'
import ChangeTrackButtonContextWrap from './extra/ChangeTrackContextWrap'
import StopButtonContextWrap from './extra/StopContextWrap'

export default class Extra extends React.PureComponent {
  render () {
    return (
      <React.Fragment>
        <VolumeButtonContextWrap />
        <ChangeTrackButtonContextWrap />
        <StopButtonContextWrap />
      </React.Fragment>
    )
  }
}
