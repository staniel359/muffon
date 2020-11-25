import React from 'react'
import { Popup } from 'semantic-ui-react'
import ChangeTrackButton from '../../../buttons/ChangeTrack'
import PlayerContext from 'contexts/PlayerContext'

export default class Change extends React.PureComponent {
  render () {
    const changeTrackButtonData = (
      <PlayerContext.Consumer>
        {context => {
          const { currentTrackData, getTrackData } = context
          const changeTrackButtonProps = { currentTrackData, getTrackData }

          return <ChangeTrackButton {...changeTrackButtonProps} />
        }}
      </PlayerContext.Consumer>
    )

    return (
      <Popup
        inverted
        positionFixed
        on="hover"
        position="top center"
        content="Wrong track? Next"
        className="playerPanelExtraPopup"
        trigger={changeTrackButtonData}
      />
    )
  }
}
