import React from 'react'
import { Container, Sidebar, Segment } from 'semantic-ui-react'
import AudioContainerContext from './player/panel/AudioContainerContext'
import Controls from './player/panel/Controls'
import TimeBarContext from './player/panel/TimeBarContext'
import Track from './player/panel/Track'
import VariantsContext from './player/panel/track/VariantsContext'

export default class PlayerPanel extends React.PureComponent {
  render () {
    const {
      currentTrack,
      currentTrackVariants,
      currentTrackSource
    } = this.props

    const currentTrackVariantsData = currentTrackVariants && (
      <Container className="playerPanelTrackVariantsContainer">
        <VariantsContext />
      </Container>
    )

    const backgroundData = <div className="playerPanelBackground" />

    const trackProps = { currentTrack, currentTrackSource }
    const trackData = currentTrack && <Track {...trackProps} />

    const audioData = (
      <React.Fragment>
        <AudioContainerContext />
        <Controls />
        <TimeBarContext />
      </React.Fragment>
    )

    const mainData = (
      <Container className="playerPanelMainContainer">
        <div className="playerPanelLeftColumn">{trackData}</div>
        <div className="playerPanelRightColumn">{audioData}</div>
      </Container>
    )

    const contentData = (
      <React.Fragment>
        {currentTrackVariantsData}
        {backgroundData}
        {mainData}
      </React.Fragment>
    )

    return (
      <React.Fragment>
        <Sidebar
          direction="bottom"
          animation="overlay"
          className="playerPanel"
          as={Segment}
          visible={!!currentTrack}
          content={contentData}
        />
      </React.Fragment>
    )
  }
}
