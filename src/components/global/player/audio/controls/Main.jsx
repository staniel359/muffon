import React from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { pauseAudio, unpauseAudio } from 'src/redux/actions/player'

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      shuffle: false,
      repeat: false
    }
  }

  controlsData () {
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

  shuffleButton () {
    return (
      <Button
        basic={!this.state.shuffle}
        size="tiny"
        icon="shuffle"
        onClick={this.toggleShuffle}
      />
    )
  }

  toggleShuffle = () => {
    this.setState({ shuffle: !this.state.shuffle })
  }

  toggleAudioButton () {
    return (
      <Button
        basic
        onClick={this.toggleAudio}
        icon={this.toggleAudioButtonIcon()}
      />
    )
  }

  toggleAudio = () => {
    this.toggleAudioActions[this.props.audioStatus]()
  }

  toggleAudioActions = {
    play: this.props.pauseAudio,
    pause: this.props.unpauseAudio
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
        basic={!this.state.repeat}
        size="tiny"
        icon="redo alternate"
        onClick={this.toggleRepeat}
      />
    )
  }

  toggleRepeat = () => {
    const repeat = !this.state.repeat

    this.setState({ repeat: repeat })
    this.audio.loop = repeat
  }

  audio = document.getElementById('playerPanelAudio')

  render () {
    return this.controlsData()
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, { pauseAudio, unpauseAudio })(Main)
