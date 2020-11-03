import React from 'react'
import MainControls from './controls/Main'
import ExtraControls from './controls/Extra'
import Timer from './controls/Timer'
import { Grid } from 'semantic-ui-react'

export default class Controls extends React.Component {
  timerProps () {
    const { currentTime, duration } = this.props

    return { currentTime, duration }
  }

  mainControlsProps () {
    const {
      audioStatus,
      shuffle,
      repeat,
      toggleShuffle,
      toggleAudio,
      toggleRepeat
    } = this.props

    return {
      audioStatus,
      shuffle,
      repeat,
      toggleShuffle,
      toggleAudio,
      toggleRepeat
    }
  }

  render () {
    return (
      <Grid columns="equal" verticalAlign="middle">
        <Grid.Column textAlign="left">
          <Timer {...this.timerProps()} />
        </Grid.Column>

        <Grid.Column textAlign="center" width={8}>
          <MainControls {...this.mainControlsProps()} />
        </Grid.Column>

        <Grid.Column textAlign="right">
          <ExtraControls />
        </Grid.Column>
      </Grid>
    )
  }
}
