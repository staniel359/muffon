import React from 'react'
import { Container, Sidebar, Segment } from 'semantic-ui-react'
import AudioContainerContext from './player/panel/AudioContainerContext'
import Controls from './player/panel/Controls'
import TimeBarContext from './player/panel/TimeBarContext'
import Track from './player/panel/Track'

export default class PlayerPanel extends React.PureComponent {
  render () {
    const { currentTrack } = this.props

    const track = currentTrack

    const trackData = (
      <div className="playerPanelLeftColumn">
        <Track {...{ track }} />
      </div>
    )

    const audioData = (
      <div className="playerPanelRightColumn">
        <AudioContainerContext />
        <Controls />
        <TimeBarContext />
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
