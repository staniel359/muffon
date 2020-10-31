import React from 'react'
import { Button, List, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import {
  setPlayingNowTrack,
  pauseAudio,
  unpauseAudio
} from '../../../../redux/actions/main'

class Track extends React.Component {
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

  trackData () {
    return (
      <List.Item>
        <List.Icon verticalAlign="middle">{this.playButtonData()}</List.Icon>

        <List.Content as={Link} to={this.trackLink()}>
          <List.Header as="h4" content={this.props.track.title} />
          <List.Description content={this.trackCounter()} />
        </List.Content>
      </List.Item>
    )
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
        query: `${this.props.artistName} ${this.props.track.title}`
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

  trackLink () {
    return `/artists/${this.artistName}/tracks/${this.trackTitle}`
  }

  artistName = encodeURIComponent(this.props.artistName)
  trackTitle = encodeURIComponent(this.props.track.title)

  trackCounter () {
    return (
      <div className="artistPageTrackCounter">
        <div
          className="inner trackLine"
          style={{ width: this.trackListenersLineWidth }}
        />
        <div className="inner">
          <Icon name="user" />
          {this.listenersCount.toLocaleString('eu')}
        </div>
      </div>
    )
  }

  listenersCount = this.props.track.listeners_count
  topTrackListenersCount = this.props.topTrackListenersCount
  trackListenersLineWidth = `${
    (this.listenersCount / this.topTrackListenersCount) * 70
  }%`

  render () {
    return this.trackData()
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, {
  setPlayingNowTrack,
  pauseAudio,
  unpauseAudio
})(Track)
