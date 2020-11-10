import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import axios from 'axios'

export default class PlayerProvider extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      toggleAudio: this.toggleAudio,
      stopAudio: this.stopAudio,
      toggleAudioButtonIcon: this.toggleAudioButtonIcon,
      toggleMute: this.toggleMute,
      muted: false,
      volume: 100,
      changeVolume: this.changeVolume,
      handleVolumeChange: this.handleVolumeChange,
      shuffle: false,
      toggleShuffle: this.toggleShuffle,
      repeat: false,
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
      currentTrackId: 0,
      setCurrentTrackId: this.setCurrentTrackId
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

  handlePause = () => {
    this.setState({ audioStatus: 'pause' })
  }

  audio () {
    return document.getElementById('playerPanelAudio')
  }

  handlePlay = () => {
    this.setState({ audioStatus: 'play' })
  }

  stopAudio = () => {
    this.setState({ audioStatus: 'stop' })

    this.resetCurrentTrack()

    this.audio().src = ''
  }

  resetCurrentTrack () {
    this.setState({
      currentTrack: null,
      currentTrackData: null,
      currentTrackId: null
    })
  }

  toggleAudioButtonIcon = () => {
    switch (this.state.audioStatus) {
      case 'play':
        return 'pause'
      case 'pause':
        return 'play'
      default:
        return 'pause'
    }
  }

  toggleMute = () => {
    const mutedValue = !this.state.muted

    this.audio().muted = mutedValue

    this.setState({ muted: mutedValue })
  }

  changeVolume = e => {
    const volume = parseInt(e.target.value)
    const muted = volume === 0

    this.audio().volume = volume / 100
    this.audio().muted = muted
  }

  handleVolumeChange = e => {
    const volume = Math.floor(e.target.volume * 100)
    const muted = e.target.muted

    this.setState({ volume: volume, muted: muted })
  }

  toggleShuffle = () => {
    this.setState({ shuffle: !this.state.shuffle })
  }

  toggleRepeat = () => {
    const repeat = !this.state.repeat

    this.audio().loop = repeat

    this.setState({ repeat: repeat })
  }

  handleLoadStart = () => {
    this.setState({ duration: 0, secondsLoaded: 0 })
  }

  handleProgress = e => {
    this.setState({
      secondsLoaded: this.secondsLoaded(e.target),
      duration: e.target.duration
    })
  }

  secondsLoaded (audio) {
    const loaded = audio.buffered
    const indexLoaded = loaded.length - 1

    return loaded.end(indexLoaded)
  }

  handleTimeUpdate = e => {
    this.setState({ currentTime: e.target.currentTime })
  }

  handleAudioEnd = e => {
    e.target.currentTime = 0

    this.audio().pause()
  }

  changeTime = e => {
    this.audio().currentTime = e.target.value
  }

  startTimeChange = () => {
    this.setState({ audioStatusOnChange: this.state.audioStatus })
    this.audio().pause()
  }

  endTimeChange = () => {
    this.audio().currentTime = this.state.currentTime
    this.audio()[this.state.audioStatusOnChange]()
  }

  getTrack = (artist, title, index = 0) => {
    const queryString = `${artist} ${title}`
    const url = '/vk/track'
    const params = { query: queryString, index: index }

    return axios.get(url, { params: params }).then(resp => {
      const { track } = resp.data

      if (track) {
        this.setState({
          currentTrack: track,
          currentTrackData: { artist: artist, title: title, index: index }
        })

        this.audio().src = track.link

        this.audio().play()
      }

      return resp
    })
  }

  setCurrentTrackId = id => {
    this.setState({ currentTrackId: id })
  }

  render () {
    return (
      <PlayerContext.Provider value={this.state}>
        {this.props.children}
      </PlayerContext.Provider>
    )
  }
}
