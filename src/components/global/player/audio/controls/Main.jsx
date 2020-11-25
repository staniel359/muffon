import React from 'react'
import { Button } from 'semantic-ui-react'

export default class Main extends React.PureComponent {
  render () {
    const {
      shuffle,
      toggleShuffle,
      toggleAudio,
      audioStatus,
      repeat,
      toggleRepeat
    } = this.props

    const shuffleButton = (
      <Button basic={!shuffle} compact icon="shuffle" onClick={toggleShuffle} />
    )

    const backwardButton = <Button basic compact icon="backward" />

    const toggleAudioButtonIcon = () => {
      switch (audioStatus) {
        case 'play':
          return 'pause'
        case 'pause':
          return 'play'
        default:
          return 'pause'
      }
    }
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
