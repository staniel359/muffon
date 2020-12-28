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
      getVkAudio: this.getVkAudio,
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
      currentTrack: null,
      currentTrackId: null,
      currentTrackVariants: null,
      currentTrackIndex: null,
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

  getTrack = track => {
    if (track.has_audio) {
      if (track.bandcamp_link) {
        return this.getBandcampTrack(track)
      }
    } else {
      return this.getVkTrack(track)
    }
  }

  getBandcampTrack = track => {
    this.request = axios.CancelToken.source()

    const bandcampLinkEncoded = encodeURIComponent(track.bandcamp_link)
    const url = `/bandcamp/tracks/${bandcampLinkEncoded}`

    const cancelToken = this.request.tokend
    const extra = { cancelToken }

    const setCurrentTrackData = resp => {
      this.setState({
        currentTrack: resp.data.track,
        currentTrackId: track.id,
        currentTrackSource: 'bandcamp',
        currentTrackVariants: null
      })

      return resp
    }

    return axios.get(url, extra).then(setCurrentTrackData).then(this.setAudio)
  }

  setAudio = resp => {
    const audioLink = resp.data.track.audio_link

    this.audio().src = audioLink
    this.audio().load()
  }

  getVkTrack = track => {
    this.request = axios.CancelToken.source()

    const url = '/vk/search/tracks'

    const query = `${track.artist} ${track.title}`
    const params = { query }

    const cancelToken = this.request.token
    const extra = { params, cancelToken }

    const setCurrentTrackVariants = resp => {
      this.setState({ currentTrackVariants: resp.data.search.tracks })
    }

    const setCurrentTrackId = () => {
      this.setState({ currentTrackId: track.id })
    }

    return axios
      .get(url, extra)
      .then(setCurrentTrackVariants)
      .then(this.getVkAudio)
      .then(setCurrentTrackId)
  }

  getVkAudio = (index = 0) => {
    const { currentTrackVariants } = this.state

    this.request = axios.CancelToken.source()

    const audioId = currentTrackVariants[index].audio_id
    const url = `/vk/tracks/${audioId}`

    const cancelToken = this.request.token
    const extra = { cancelToken }

    const setCurrentTrackData = resp => {
      this.setState({
        currentTrack: resp.data.track,
        currentTrackIndex: index,
        currentTrackSource: 'vk'
      })

      return resp
    }

    return axios.get(url, extra).then(setCurrentTrackData).then(this.setAudio)
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
