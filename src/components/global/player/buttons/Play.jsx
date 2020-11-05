import React from 'react'
import { Button } from 'semantic-ui-react'
import PlayerContext from 'contexts/PlayerContext'
import GetTrackButton from './GetTrack'

export default class Play extends React.Component {
  static contextType = PlayerContext

  constructor (props) {
    super(props)
    this.state = {}
  }

  noTrack () {
    const audioStopped = this.context.audioStatus === 'stop'
    const noAudio = !this.state.audioPresent

    return audioStopped || noAudio
  }

  getTrackButton () {
    const { artistName, trackTitle } = this.props
    const { audioPresent } = this

    return <GetTrackButton {...{ artistName, trackTitle, audioPresent }} />
  }

  audioPresent = () => {
    this.setState({ audioPresent: true })
  }

  toggleAudioButton () {
    return (
      <Button
        onClick={this.context.toggleAudio}
        icon={this.context.toggleAudioButtonIcon()}
      />
    )
  }

  render () {
    return this.noTrack() ? this.getTrackButton() : this.toggleAudioButton()
  }
}
