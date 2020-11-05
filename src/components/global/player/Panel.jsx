import React from 'react'
import { Container, Sidebar, Segment } from 'semantic-ui-react'
import 'styles/global/Player.sass'
import PlayerContext from 'contexts/PlayerContext'
import AudioContainer from './audio/AudioContainer'
import Controls from './audio/Controls'
import TimeBar from './audio/TimeBar'
import Track from './Track'

export default class Panel extends React.Component {
  static contextType = PlayerContext

  playerPanelContainer () {
    return (
      <Container className="playerPanelContainer">
        <div className="playerPanelLeftColumn">
          <Track />
        </div>

        <div className="playerPanelRightColumn">
          <AudioContainer />

          <Controls />

          <TimeBar />
        </div>
      </Container>
    )
  }

  render () {
    return (
      <Sidebar
        as={Segment}
        visible={!!this.context.playingNowTrack}
        direction="bottom"
        animation="overlay"
        className="playerPanel"
      >
        {this.context.playingNowTrack && this.playerPanelContainer()}
      </Sidebar>
    )
  }
}
