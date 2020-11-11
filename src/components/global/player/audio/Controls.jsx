import React from 'react'
import MainControls from './controls/Main'
import ExtraControls from './controls/Extra'
import Timer from './controls/Timer'
export default class Controls extends React.PureComponent {
  render () {
    return (
      <div className="playerPanelMainControls">
        <div>
          <Timer />
        </div>
        <div>
          <MainControls />
        </div>
        <div>
          <ExtraControls />
        </div>
      </div>
    )
  }
}
