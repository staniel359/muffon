import React from 'react'
import { Button, Popup } from 'semantic-ui-react'

export default class StopButton extends React.PureComponent {
  buttonData () {
    const { stopAudio } = this.props

    return <Button basic compact size="tiny" icon="times" onClick={stopAudio} />
  }

  render () {
    return (
      <Popup
        inverted
        positionFixed
        on="hover"
        position="top center"
        content="Stop"
        className="buttonPopup"
        trigger={this.buttonData()}
      />
    )
  }
}
