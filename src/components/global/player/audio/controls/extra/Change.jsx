import React from 'react'
import { Popup } from 'semantic-ui-react'
import ChangeTrackButton from '../../../buttons/ChangeTrack'

export default class Change extends React.PureComponent {
  render () {
    return (
      <Popup
        inverted
        positionFixed
        on="hover"
        position="top center"
        content="Wrong track? Next"
        className="playerPanelExtraPopup"
        trigger={<ChangeTrackButton />}
      />
    )
  }
}
