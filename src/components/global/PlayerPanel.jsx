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
  render () {
    const { isPlayerPanelVisible } = this.props

    const variantsData = (
      <Container className="playerPanelTrackVariantsContainer">
        <VariantsContext />
      </Container>
    )

    const backgroundData = <div className="playerPanelBackground" />

    const trackData = (
      <div className="playerPanelLeftColumn">
        <TrackContext />
      </div>
    )

    const timerControlsData = (
      <div className="playerPanelTimerControls">
        <TimerContext />
        <MainControls />
        <ExtraControls />
      </div>
    )

    const audioData = (
      <div className="playerPanelRightColumn">
        <AudioContainerContext />
        {timerControlsData}
        <TimeBarContext />
      </div>
    )

    const mainData = (
      <Container className="playerPanelMainContainer">
        {trackData}
        {audioData}
      </Container>
    )

    const contentData = (
      <React.Fragment>
        {variantsData}
        {backgroundData}
        {mainData}
      </React.Fragment>
    )

    return (
      <Sidebar
        direction="bottom"
        animation="overlay"
        className="playerPanel"
        as={Segment}
        visible={isPlayerPanelVisible}
        content={contentData}
      />
    )
  }
}
