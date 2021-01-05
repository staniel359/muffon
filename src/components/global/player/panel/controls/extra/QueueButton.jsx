import React from 'react'
import { Button, Popup } from 'semantic-ui-react'

export default class triggerData extends React.PureComponent {
  render () {
    const { toggleQueuePanel } = this.props

    const triggerData = (
      <Button basic compact icon="numbered list" onClick={toggleQueuePanel} />
    )

    return (
      <Popup
        inverted
        positionFixed
        on="hover"
        position="top center"
        content="Queue"
        className="playerPanelExtraPopup"
        trigger={triggerData}
      />
    )
  }
}
