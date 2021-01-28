import React from 'react'

export default class TimeBar extends React.PureComponent {
  loaderData () {
    const { secondsLoaded, duration } = this.props

    const percentLoaded = (secondsLoaded / duration) * 100 || 0
    const style = { width: `${percentLoaded}%` }

    return <div className="playerPanelAudioLoaderBar" {...{ style }} />
  }

  sliderData () {
    const {
      duration,
      currentTime,
      changeTime,
      startTimeChange,
      endTimeChange
    } = this.props

    const percentPlayed = (currentTime / duration) * 100 || 0
    const backgroundImage = `
      -webkit-gradient(
        linear, left top, right top,
        color-stop(${percentPlayed}%, #804FB3),
        color-stop(${percentPlayed}%, transparent)
      )
    `
    const style = { backgroundImage }

    return (
      <input
        className="playerPanelBar playerPanelAudioBar"
        type="range"
        step="0.25"
        max={duration}
        value={currentTime}
        onChange={changeTime}
        onMouseDown={startTimeChange}
        onMouseUp={endTimeChange}
        {...{ style }}
      />
    )
  }

  render () {
    return (
      <div className="playerPanelAudioWrap">
        <div className="playerPanelAudioBackgroundBar" />
        {this.loaderData()}
        {this.sliderData()}
      </div>
    )
  }
}
