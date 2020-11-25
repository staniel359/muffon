import React from 'react'

export default class TimeBar extends React.PureComponent {
  render () {
    const {
      secondsLoaded,
      duration,
      currentTime,
      changeTime,
      startTimeChange,
      endTimeChange
    } = this.props

    const background = <div className="playerPanelBackgroundBar" />

    const percentLoaded = (secondsLoaded / duration) * 100 || 0
    const loaderStyle = { width: `${percentLoaded}%` }
    const loader = <div className="playerPanelLoaderBar" style={loaderStyle} />

    const percentPlayed = (currentTime / duration) * 100 || 0
    const sliderBackground = `
      -webkit-gradient(
        linear, left top, right top,
        color-stop(${percentPlayed}%, #804FB3),
        color-stop(${percentPlayed}%, transparent)
      )
    `
    const sliderStyle = { backgroundImage: sliderBackground }
    const slider = (
      <input
        type="range"
        step="0.25"
        max={duration}
        value={currentTime}
        className="playerPanelBar playerPanelAudioBar"
        style={sliderStyle}
        onChange={changeTime}
        onMouseDown={startTimeChange}
        onMouseUp={endTimeChange}
      />
    )

    return (
      <div className="playerPanelAudioWrap">
        {background}
        {loader}
        {slider}
      </div>
    )
  }
}
