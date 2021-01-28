import React from 'react'
import { Container, Sidebar, Segment } from 'semantic-ui-react'
import AudioContainerContext from './player/panel/AudioContainerContext'
import TimerContext from './player/panel/TimerContext'
import MainControls from './player/panel/controls/Main'
import ExtraControls from './player/panel/controls/Extra'
import TimeBarContext from './player/panel/TimeBarContext'
import TrackContext from './player/panel/TrackContext'
import VariantsContext from './player/panel/track/VariantsContext'

export default class PlayerPanel extends React.PureComponent {
  contentData () {
    const variantsData = (
      <Container className="playerPanelTrackVariantsContainer">
        <VariantsContext />
      </Container>
    )

    return (
      <React.Fragment>
        {variantsData}
        <div className="playerPanelBackground" />
        {this.mainData()}
      </React.Fragment>
    )
  }

  mainData () {
    const trackData = (
      <div className="playerPanelLeftColumn">
        <TrackContext />
      </div>
    )

    return (
      <Container className="playerPanelMainContainer">
        {trackData}
        {this.audioData()}
      </Container>
    )
  }

  audioData () {
    return (
      <div className="playerPanelRightColumn">
        <AudioContainerContext />
        {this.timerControlsData()}
        <TimeBarContext />
      </div>
    )
  }

  timerControlsData () {
    return (
      <div className="playerPanelTimerControls">
        <TimerContext />
        <MainControls />
        <ExtraControls />
      </div>
    )
  }

  render () {
    const { isPlayerPanelVisible } = this.props

    return (
      <Sidebar
        direction="bottom"
        animation="overlay"
        className="playerPanel"
        as={Segment}
        visible={isPlayerPanelVisible}
        content={this.contentData()}
      />
    )
  }
}
