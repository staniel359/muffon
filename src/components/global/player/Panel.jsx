import React from 'react'
import { Container, Sidebar, Segment } from 'semantic-ui-react'
import 'styles/global/Player.sass'
import PlayerContext from 'contexts/PlayerContext'
import AudioContainer from './audio/AudioContainer'
import Controls from './audio/Controls'
import TimeBar from './audio/TimeBar'
import Track from './Track'

export default class Panel extends React.PureComponent {
  static contextType = PlayerContext

  render () {
    const { currentTrack } = this.context

    const trackData = (
      <div className="playerPanelLeftColumn">
        <Track {...{ currentTrack }} />
      </div>
    )

    const audioData = (
      <div className="playerPanelRightColumn">
        <AudioContainer />
        <Controls />
        <TimeBar />
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
      >
        {playerPanelContainer}
      </Sidebar>
    )
  }
}
