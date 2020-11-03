import React from 'react'
import { Button } from 'semantic-ui-react'
import axios from 'axios'
import { connect } from 'react-redux'
import * as playerActions from 'src/redux/actions/player'

class PlayButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props !== prevProps) {
      this.handleAudioStop()
    }
  }

  handleAudioStop () {
    if (this.props.audioStatus === 'stop') {
      this.setState({ audio: null })
    }
  }

  playButtonData () {
    if (this.state.audio) {
      return this.playTrackButton()
    } else {
      return this.getTrackButton()
    }
  }

  playTrackButton () {
    return (
      <Button
        onClick={this.toggleTrackAudio}
        icon={this.playTrackButtonIcons[this.props.audioStatus]}
      />
    )
  }

  toggleTrackAudio = () => {
    if (this.props.audioStatus === 'play') {
      this.props.pauseAudio()
    } else if (this.props.audioStatus === 'pause') {
      this.props.unpauseAudio()
    }
  }

  playTrackButtonIcons = {
    play: 'pause',
    pause: 'play'
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
      params: {
        query: `${this.props.artistName} ${this.props.trackTitle}`
      }
    }
  }

  handleSuccess (resp) {
    this.setGlobalState(resp)
    this.setLocalState()
  }

  setGlobalState (resp) {
    this.props.setPlayingNowTrack(resp.data.track)
  }

  setLocalState () {
    this.setState({
      audio: true,
      loading: false
    })
  }

  handleError (error) {
    this.setState({ error: error })
  }

  render () {
    return this.playButtonData()
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, playerActions)(PlayButton)
