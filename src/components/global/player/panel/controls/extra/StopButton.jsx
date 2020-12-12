import React from 'react'
import { Button, Popup } from 'semantic-ui-react'

export default class StopButton extends React.PureComponent {
  render () {
    const { stopAudio } = this.props

    const stopAudioButton = (
      <Button basic compact size="mini" icon="times" onClick={stopAudio} />
    )

    return (
      <Popup
        inverted
        positionFixed
        on="hover"
        position="top center"
        content="Stop and close"
        className="playerPanelExtraPopup"
        trigger={stopAudioButton}
      />
    )
  }
}
