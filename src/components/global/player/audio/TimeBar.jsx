import React from 'react'

export default class TimeBar extends React.Component {
  loaderStyle () {
    return { width: `${this.props.percentLoaded}%` }
  }

  slider () {
    return (
      <input
        type="range"
        step="0.25"
        max={this.props.duration || 0}
        value={this.props.currentTime}
        className="playerPanelBar playerPanelAudioBar"
        style={this.sliderStyle()}
        onChange={this.props.handleAudioBarTimeChange}
        onMouseDown={this.props.handleAudioBarSelectStart}
        onMouseUp={this.props.handleAudioBarSelectEnd}
      />
    )
  }

  sliderStyle () {
    return { backgroundImage: this.sliderBackground() }
  }

  sliderBackground () {
    const percent = this.percentPlayed() || 0
    return `
      -webkit-gradient(
        linear, left top, right top,
        color-stop(${percent}%, #804FB3),
        color-stop(${percent}%, transparent)
      )
    `
  }

  percentPlayed () {
    return (this.props.currentTime / this.props.duration) * 100
  }

  render () {
    return (
      <div className="playerPanelAudioWrap">
        <div className="playerPanelBar playerPanelBackgroundBar" />

        <div
          className="playerPanelBar playerPanelLoaderBar"
          style={this.loaderStyle()}
        />

        {this.slider()}
      </div>
    )
  }
}
