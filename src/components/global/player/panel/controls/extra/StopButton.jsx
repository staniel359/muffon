import React from 'react'
import { Button, Popup } from 'semantic-ui-react'

export default class StopButton extends React.PureComponent {
  render () {
    const { stopAudio } = this.props

    const triggerData = (
      <Button basic compact size="tiny" icon="times" onClick={stopAudio} />
    )

    return (
      <Popup
        inverted
        positionFixed
        on="hover"
        position="top center"
        content="Stop"
        className="playerPanelExtraPopup"
        trigger={triggerData}
      />
    )
  }
}
