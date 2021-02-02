import React from 'react'
import { Button, Popup } from 'semantic-ui-react'

export default class QueueButton extends React.PureComponent {
  buttonData () {
    const { queue, toggleQueuePanel } = this.props

    return (
      <Button
        basic
        compact
        size="tiny"
        icon="numbered list"
        disabled={!queue}
        onClick={toggleQueuePanel}
      />
    )
  }

  render () {
    return (
      <Popup
        inverted
        positionFixed
        on="hover"
        position="top center"
        content="Queue"
        className="buttonPopup"
        trigger={this.buttonData()}
      />
    )
  }
}
