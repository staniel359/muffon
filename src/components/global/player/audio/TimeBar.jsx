import React from 'react'
import PlayerContext from 'contexts/PlayerContext'

export default class TimeBar extends React.Component {
  static contextType = PlayerContext

  timeBarData () {
    return (
      <div className="playerPanelAudioWrap">
        <div className="playerPanelBackgroundBar" />

        <div className="playerPanelLoaderBar" style={this.loaderStyle()} />

        {this.slider()}
      </div>
    )
  }

  loaderStyle () {
    return { width: `${this.percentLoaded()}%` }
  }

  percentLoaded () {
    return (this.context.secondsLoaded / this.context.duration) * 100 || 0
  }

  slider () {
    return (
      <input
        type="range"
        step="0.25"
        max={this.context.duration}
        value={this.context.currentTime}
        className="playerPanelBar playerPanelAudioBar"
        style={this.sliderStyle()}
        onChange={this.context.changeTime}
        onMouseDown={this.context.startTimeChange}
        onMouseUp={this.context.endTimeChange}
      />
    )
  }

  sliderStyle () {
    return { backgroundImage: this.sliderBackground() }
  }

  sliderBackground () {
    return `
      -webkit-gradient(
        linear, left top, right top,
        color-stop(${this.percentPlayed()}%, #804FB3),
        color-stop(${this.percentPlayed()}%, transparent)
      )
    `
  }

  percentPlayed () {
    return (this.context.currentTime / this.context.duration) * 100 || 0
  }

  render () {
    return this.timeBarData()
  }
}
