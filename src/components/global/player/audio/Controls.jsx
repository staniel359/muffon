import React from 'react'
import MainControls from './controls/Main'
import ExtraControls from './controls/Extra'
import Timer from './controls/Timer'
import { Grid } from 'semantic-ui-react'

export default class Controls extends React.PureComponent {
  render () {
    return (
      <Grid columns="equal" verticalAlign="middle">
        <Grid.Column textAlign="left">
          <Timer />
        </Grid.Column>

        <Grid.Column textAlign="center" width={7}>
          <MainControls />
        </Grid.Column>

        <Grid.Column textAlign="right">
          <ExtraControls />
        </Grid.Column>
      </Grid>
    )
  }
}
