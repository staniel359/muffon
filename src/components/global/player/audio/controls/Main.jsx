import React from 'react'
import { Button } from 'semantic-ui-react'
import PlayerContext from 'contexts/PlayerContext'

export default class Main extends React.PureComponent {
  static contextType = PlayerContext

  render () {
    const {
      shuffle,
      toggleShuffle,
      toggleAudio,
      toggleAudioButtonIcon,
      repeat,
      toggleRepeat
    } = this.context

    const shuffleButton = (
      <Button basic={!shuffle} compact icon="shuffle" onClick={toggleShuffle} />
    )

    const backwardButton = <Button basic compact icon="backward" />

    const toggleAudioButton = (
      <Button basic onClick={toggleAudio} icon={toggleAudioButtonIcon()} />
    )

    const forwardButton = <Button basic compact icon="forward" />

    const repeatButton = (
      <Button
        basic={!repeat}
        compact
        icon="redo alternate"
        onClick={toggleRepeat}
      />
    )

    return (
      <React.Fragment>
        {shuffleButton}
        {backwardButton}
        {toggleAudioButton}
        {forwardButton}
        {repeatButton}
      </React.Fragment>
    )
  }
}
