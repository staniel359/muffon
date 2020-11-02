import React from 'react'
import MainControls from './controls/Main'
import ExtraControls from './controls/Extra'
import Timer from './controls/Timer'
import { Grid } from 'semantic-ui-react'

export default class Controls extends React.Component {
  audioTimer () {
    const { currentTime, duration } = this.props
    const propsSet = { currentTime, duration }

    return <Timer {...propsSet} />
  }

  mainControls () {
    const {
      audioStatus,
      shuffle,
      repeat,
      toggleShuffle,
      toggleAudio,
      toggleRepeat
    } = this.props
    const propsSet = {
      audioStatus,
      shuffle,
      repeat,
      toggleShuffle,
      toggleAudio,
      toggleRepeat
    }

    return <MainControls {...propsSet} />
  }

  extraControls () {
    const {
      stopAudio,
      muted,
      currentVolume,
      toggleMute,
      handleVolumeChange
    } = this.props
    const propsSet = {
      stopAudio,
      muted,
      currentVolume,
      toggleMute,
      handleVolumeChange
    }

    return <ExtraControls {...propsSet} />
  }

  render () {
    return (
      <Grid columns="equal" verticalAlign="middle">
        <Grid.Column textAlign="left">{this.audioTimer()}</Grid.Column>

        <Grid.Column textAlign="center" width={8}>
          {this.mainControls()}
        </Grid.Column>

        <Grid.Column textAlign="right">{this.extraControls()}</Grid.Column>
      </Grid>
    )
  }
}
