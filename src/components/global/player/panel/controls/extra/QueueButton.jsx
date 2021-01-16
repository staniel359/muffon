import React from 'react'
import { Button, Popup } from 'semantic-ui-react'

export default class triggerData extends React.PureComponent {
  render () {
    const { queue, toggleQueuePanel } = this.props

    const triggerData = (
      <Button
        basic
        compact
        size="tiny"
        icon="numbered list"
        disabled={!queue}
        onClick={toggleQueuePanel}
      />
    )

    const contentData = (
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

    return <React.Fragment>{contentData}</React.Fragment>
  }
}
