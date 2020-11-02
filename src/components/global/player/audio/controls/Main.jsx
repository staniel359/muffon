import React from 'react'
import { Button } from 'semantic-ui-react'

export default class Main extends React.Component {
  shuffleButton () {
    return (
      <Button
        basic={!this.props.shuffle}
        size="tiny"
        icon="shuffle"
        onClick={this.props.toggleShuffle}
      />
    )
  }

  toggleAudioButton () {
    return (
      <Button
        basic
        onClick={this.props.toggleAudio}
        icon={this.toggleAudioButtonIcon()}
      />
    )
  }

  toggleAudioButtonIcon () {
    return this.toggleAudioButtonIcons[this.props.audioStatus]
  }

  toggleAudioButtonIcons = {
    play: 'pause',
    pause: 'play'
  }

  repeatButton () {
    return (
      <Button
        basic={!this.props.repeat}
        size="tiny"
        icon="redo alternate"
        onClick={this.props.toggleRepeat}
      />
    )
  }

  render () {
    return (
      <React.Fragment>
        {this.shuffleButton()}

        <Button basic size="tiny" icon="backward" />

        {this.toggleAudioButton()}

        <Button basic size="tiny" icon="forward" />

        {this.repeatButton()}
      </React.Fragment>
    )
  }
}
