import React from 'react'
import TimerContext from './controls/TimerContext'
import MainContext from './controls/MainContext'
import ExtraControls from './controls/Extra'

export default class Controls extends React.PureComponent {
  render () {
    return (
      <div className="playerPanelMainControls">
        <div>
          <TimerContext />
        </div>
        <div>
          <MainContext />
        </div>
        <div>
          <ExtraControls />
        </div>
      </div>
    )
  }
}
