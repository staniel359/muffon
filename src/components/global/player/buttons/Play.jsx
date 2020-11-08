import React from 'react'
import { Button } from 'semantic-ui-react'
import PlayerContext from 'contexts/PlayerContext'
import GetTrackButton from './GetTrack'

export default class Play extends React.Component {
  static contextType = PlayerContext

  isPlaying () {
    const { currentTrackId } = this.context
    const { trackId } = this.props

    return currentTrackId === trackId
  }

  toggleAudioButton () {
    const { toggleAudio, toggleAudioButtonIcon } = this.context

    return <Button onClick={toggleAudio} icon={toggleAudioButtonIcon()} />
  }

  getTrackButton () {
    const { artistName, trackTitle, trackId } = this.props
    const props = { artistName, trackTitle, trackId }

    return <GetTrackButton {...props} />
  }

  render () {
    return this.isPlaying() ? this.toggleAudioButton() : this.getTrackButton()
  }
}
