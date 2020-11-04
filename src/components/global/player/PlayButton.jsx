import React from 'react'
import { Button } from 'semantic-ui-react'
import axios from 'axios'
import PlayerContext from 'contexts/PlayerContext'

export default class PlayButton extends React.Component {
  static contextType = PlayerContext
  constructor (props) {
    super(props)
    this.state = {}
  }

  playButtonData () {
    const audioStopped = this.context.audioStatus === 'stop'
    const noAudio = !this.state.audio

    if (audioStopped || noAudio) {
      return this.getTrackButton()
    } else {
      return this.toggleAudioButton()
    }
  }

  getTrackButton () {
    return (
      <Button
        onClick={this.getVkTrack}
        loading={this.state.loading}
        icon={this.state.error ? 'times' : 'play'}
      />
    )
  }

  getVkTrack = () => {
    this.setState({ loading: true })

    axios(this.vkTrackLink())
      .then(resp => this.handleSuccess(resp))
      .catch(error => this.handleError(error))
      .then(() => this.setState({ loading: false }))
  }

  vkTrackLink () {
    return {
      method: 'GET',
      url: '/vk/track',
      params: { query: this.queryString }
    }
  }

  queryString = `${this.props.artistName} ${this.props.trackTitle}`

  handleSuccess (resp) {
    this.context.setPlayingNowTrack(resp.data.track)
    this.setState({ audio: true, loading: false })
  }

  handleError (error) {
    this.setState({ error: error })
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
    return this.playButtonData()
  }
}
