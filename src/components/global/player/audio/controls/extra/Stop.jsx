import React from 'react'
import { Button, Popup } from 'semantic-ui-react'
import PlayerContext from 'contexts/PlayerContext'

export default class Stop extends React.PureComponent {
  static contextType = PlayerContext

  render () {
    const { stopAudio } = this.context

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
