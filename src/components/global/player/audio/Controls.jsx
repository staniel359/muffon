import React from 'react'
import MainControlsContextWrap from './controls/MainContextWrap'
import ExtraControls from './controls/Extra'
import TimerContextWrap from './controls/TimerContextWrap'

export default class Controls extends React.PureComponent {
  render () {
    return (
      <div className="playerPanelMainControls">
        <div>
          <TimerContextWrap />
        </div>
        <div>
          <MainControlsContextWrap />
        </div>
        <div>
          <ExtraControls />
        </div>
      </div>
    )
  }
}
