import React from 'react'
import { Container, Sidebar, Segment } from 'semantic-ui-react'
import AudioContainerContextWrap from './player/audio/AudioContainerContextWrap'
import Controls from './player/audio/Controls'
import TimeBarContextWrap from './player/audio/TimeBarContextWrap'
import Track from './player/Track'
import 'styles/global/Player.sass'

export default class Panel extends React.PureComponent {
  render () {
    const { currentTrack } = this.props

    const trackData = (
      <div className="playerPanelLeftColumn">
        <Track {...{ currentTrack }} />
      </div>
    )

    const audioData = (
      <div className="playerPanelRightColumn">
        <AudioContainerContextWrap />
        <Controls />
        <TimeBarContextWrap />
      </div>
    )

    const playerPanelContainer = currentTrack && (
      <Container className="playerPanelContainer">
        {trackData}
        {audioData}
      </Container>
    )

    return (
      <Sidebar
        as={Segment}
        visible={!!currentTrack}
        direction="bottom"
        animation="overlay"
        className="playerPanel"
        content={playerPanelContainer}
      />
    )
  }
}
