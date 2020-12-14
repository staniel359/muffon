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
      getTrack: this.getTrack,
      getAudio: this.getAudio,
      currentTrack: {},
      updateCurrentTrack: this.updateCurrentTrack,
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
    this.setState({
      audioStatus: 'stop',
      currentTrack: {},
      currentTime: 0,
      secondsLoaded: 0
    })

    this.audio().src = ''
  }

  toggleMute = () => {
    const isMuted = !this.state.isMuted

    this.audio().muted = isMuted

    this.setState({ isMuted })
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

    this.setState({ volume, isMuted })
  }

  toggleShuffle = () => {
    const isShuffle = !this.state.isShuffle

    this.setState({ isShuffle })
  }

  toggleRepeat = () => {
    const isRepeat = !this.state.isRepeat

    this.audio().loop = isRepeat

    this.setState({ isRepeat })
  }

  handleLoadStart = () => {
    this.setState({ duration: 0, secondsLoaded: 0 })
  }

  handleProgress = e => {
    const secondsLoaded = e.target.buffered.end(0)
    const { duration } = e.target

    this.setState({ secondsLoaded, duration })
  }

  handleTimeUpdate = e => {
    const { currentTime } = e.target

    this.setState({ currentTime })
  }

  handleAudioEnd = e => {
    e.target.currentTime = 0

    this.audio().pause()
  }

  changeTime = e => (this.audio().currentTime = e.target.value)

  startTimeChange = () => {
    const audioStatusOnChange = this.state.audioStatus

    this.setState({ audioStatusOnChange })

    this.audio().pause()
  }

  endTimeChange = () => {
    const { currentTime, audioStatusOnChange } = this.state

    this.audio().currentTime = currentTime
    this.audio()[audioStatusOnChange]()
  }

  getTrack = ({ artistName, trackTitle }) => {
    this.request = axios.CancelToken.source()

    const url = '/vk/search/tracks'

    const query = `${artistName} ${trackTitle}`
    const params = { query }

    const cancelToken = this.request.token
    const extra = { params, cancelToken }

    return axios.get(url, extra).then(this.setVariants).then(this.getAudio)
  }

  setVariants = resp => {
    const variants = resp.data.search.tracks

    this.updateCurrentTrack({ variants })
  }

  getAudio = (index = 0) => {
    const { variants } = this.state.currentTrack

    this.request = axios.CancelToken.source()

    const audioId = variants[index].audio_id
    const url = `/vk/tracks/${audioId}`

    const cancelToken = this.request.token
    const extra = { cancelToken }

    const setIndex = resp => {
      this.updateCurrentTrack({ index })

      return resp
    }

    return axios.get(url, extra).then(setIndex).then(this.setAudio)
  }

  setAudio = resp => {
    const { track } = resp.data

    this.updateCurrentTrack(track)

    this.audio().src = track.link
    this.audio().load()
  }

  updateCurrentTrack = data => {
    const currentTrack = { ...this.state.currentTrack, ...data }

    this.setState({ currentTrack })
  }

  cancelTrackRequest = () => this.request.cancel()

  render () {
    const { children } = this.props

    const value = this.state

    return (
      <PlayerContext.Provider {...{ value }}>{children}</PlayerContext.Provider>
    )
  }
}
