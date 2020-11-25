import React from 'react'
import MainControls from './controls/Main'
import ExtraControls from './controls/Extra'
import Timer from './controls/Timer'
import PlayerContext from 'contexts/PlayerContext'

export default class Controls extends React.PureComponent {
  render () {
    const timerData = (
      <div>
        <PlayerContext.Consumer>
          {context => {
            const { currentTime, duration } = context
            const timerProps = { currentTime, duration }

            return <Timer {...timerProps} />
          }}
        </PlayerContext.Consumer>
      </div>
    )

    const mainControlsData = (
      <div>
        <PlayerContext.Consumer>
          {context => {
            const {
              shuffle,
              toggleShuffle,
              toggleAudio,
              audioStatus,
              repeat,
              toggleRepeat
            } = context
            const mainControlsProps = {
              shuffle,
              toggleShuffle,
              toggleAudio,
              audioStatus,
              repeat,
              toggleRepeat
            }

            return <MainControls {...mainControlsProps} />
          }}
        </PlayerContext.Consumer>
      </div>
    )

    const extraControlsData = (
      <div>
        <ExtraControls />
      </div>
    )

    return (
      <div className="playerPanelMainControls">
        {timerData}
        {mainControlsData}
        {extraControlsData}
      </div>
    )
  }
}
