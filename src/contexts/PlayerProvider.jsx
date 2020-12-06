import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import axios from 'axios'

export default class PlayerProvider extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      toggleAudio: this.toggleAudio,
      stopAudio: this.stopAudio,
      toggleMute: this.toggleMute,
      isMuted: false,
      volume: 100,
      changeVolume: this.changeVolume,
      handleVolumeChange: this.handleVolumeChange,
      isShuffle: false,
      toggleShuffle: this.toggleShuffle,
      isRepeat: false,
      toggleRepeat: this.toggleRepeat,
      currentTime: 0,
      duration: 0,
      handleLoadStart: this.handleLoadStart,
      handlePlay: this.handlePlay,
      handlePause: this.handlePause,
      handleProgress: this.handleProgress,
      handleTimeUpdate: this.handleTimeUpdate,
      handleAudioEnd: this.handleAudioEnd,
      secondsLoaded: 0,
      changeTime: this.changeTime,
      startTimeChange: this.startTimeChange,
      endTimeChange: this.endTimeChange,
      getTrackData: this.getTrackData,
      currentTrackId: 0,
      setCurrentTrackId: this.setCurrentTrackId,
      cancelTrackRequest: this.cancelTrackRequest
    }
  }

  toggleAudio = () => {
    switch (this.state.audioStatus) {
      case 'play':
        return this.audio().pause()
      case 'pause':
        return this.audio().play()
    }
  }

  handlePause = () => this.setState({ audioStatus: 'pause' })

  audio = () => document.getElementById('playerPanelAudio')

  handlePlay = () => this.setState({ audioStatus: 'play' })

  stopAudio = () => {
    this.setState({ audioStatus: 'stop' })

    this.resetCurrentTrack()

    this.audio().src = ''
  }

  resetCurrentTrack () {
    this.setState({
      currentTrack: null,
      currentTrackData: null,
      currentTrackId: null,
      currentTime: 0,
      secondsLoaded: 0
    })
  }

  toggleMute = () => {
    const isMuted = !this.state.isMuted

    this.audio().muted = isMuted

    this.setState({ ...{ isMuted } })
  }

  changeVolume = e => {
    const volume = parseInt(e.target.value)
    const isMuted = volume === 0

    this.audio().volume = volume / 100
    this.audio().muted = isMuted
  }

  handleVolumeChange = e => {
    const volume = Math.floor(e.target.volume * 100)
    const isMuted = e.target.muted

    this.setState({ ...{ volume, isMuted } })
  }

  toggleShuffle = () => {
    const isShuffle = !this.state.isShuffle

    this.setState({ ...{ isShuffle } })
  }

  toggleRepeat = () => {
    const isRepeat = !this.state.isRepeat

    this.audio().loop = isRepeat

    this.setState({ ...{ isRepeat } })
  }

  handleLoadStart = () => {
    this.setState({ duration: 0, secondsLoaded: 0 })
  }

  handleProgress = e => {
    const secondsLoaded = e.target.buffered.end(0)
    const { duration } = e.target

    this.setState({ ...{ secondsLoaded, duration } })
  }

  handleTimeUpdate = e => {
    const { currentTime } = e.target

    this.setState({ ...{ currentTime } })
  }

  handleAudioEnd = e => {
    e.target.currentTime = 0

    this.audio().pause()
  }

  changeTime = e => (this.audio().currentTime = e.target.value)

  startTimeChange = () => {
    const audioStatusOnChange = this.state.audioStatus

    this.setState({ ...{ audioStatusOnChange } })
    this.audio().pause()
  }

  endTimeChange = () => {
    const { currentTime, audioStatusOnChange } = this.state

    this.audio().currentTime = currentTime
    this.audio()[audioStatusOnChange]()
  }

  getTrackData = ({ artistName, trackTitle, albumTitle, index = 0 }) => {
    this.request = axios.CancelToken.source()

    const query = `${artistName} ${trackTitle}`
    const url = '/vk/track'
    const params = { ...{ query, index } }
    const cancelToken = this.request.token
    const extra = { ...{ params, cancelToken } }

    const handleSuccess = resp => {
      const { track } = resp.data

      if (track) {
        const currentTrack = track
        const currentTrackData = {
          ...{ artistName, trackTitle, albumTitle, index }
        }

        this.setState({ ...{ currentTrack, currentTrackData } })

        this.audio().src = track.link
        this.audio().play()
      }

      return resp
    }

    return axios.get(url, extra).then(handleSuccess)
  }

  setCurrentTrackId = currentTrackId => this.setState({ ...{ currentTrackId } })

  cancelTrackRequest = () => this.request.cancel()

  render () {
    const { children } = this.props
    const value = this.state

    return (
      <PlayerContext.Provider {...{ value }}>{children}</PlayerContext.Provider>
    )
  }
}
