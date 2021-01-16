import React from 'react'
import PlayerContext from './PlayerContext'
import playerState from './player/functions/playerState'
import getAudio from './player/functions/getAudio'
import searchTrack from './player/functions/searchTrack'
import getTrackVariant from './player/functions/getTrackVariant'
import stopAudio from './player/functions/stopAudio'
import shuffleArray from 'global/functions/shuffleArray'

export default class PlayerProvider extends React.PureComponent {
  constructor (props) {
    super(props)

    this.playerState = playerState.bind(this)
    this.getAudio = getAudio.bind(this)
    this.searchTrack = searchTrack.bind(this)
    this.getTrackVariant = getTrackVariant.bind(this)
    this.stopAudio = stopAudio.bind(this)

    this.state = this.playerState()
  }

  toggleQueuePanel = () => {
    const { isQueuePanelVisible } = this.state

    this.setState({ isQueuePanelVisible: !isQueuePanelVisible })
  }

  isQueueStart = () => {
    const { queue } = this.state

    return !queue || this.queueIndex() === 0
  }

  queueIndex () {
    const { queue } = this.state

    const isQueueCurrentTrack = track => {
      const { currentTrackId } = this.state

      return track.id === currentTrackId
    }

    return queue.findIndex(isQueueCurrentTrack)
  }

  isQueueEnd = () => {
    const { queue } = this.state

    return !queue || this.queueIndex() === queue.length - 1
  }

  getQueueNextTrack = direction => {
    const { queue } = this.state

    const index = () => {
      switch (direction) {
        case 'forward':
          return this.queueIndex() + 1
        case 'backward':
          return this.queueIndex() - 1
      }
    }
    const track = queue[index()]

    return this.getTrack(track)
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

    const tracks = [...this.state.currentAlbum.tracks]
    const queue = isShuffle ? shuffleArray(tracks) : tracks

    this.setState({ isShuffle, queue })
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
    if (this.isQueueEnd()) {
      e.target.currentTime = 0

      this.audio().pause()
    } else {
      this.setState({ isLoading: true })

      this.getQueueNextTrack('forward')
    }
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
    const { audio } = track

    if (audio && audio.present) {
      return this.getAudio(track)
    } else {
      return this.searchTrack(track)
    }
  }

  setAudio = () => {
    const { link } = this.state.currentTrack.audio

    this.audio().src = link
    this.audio().load()

    this.setState({
      isPlayerPanelVisible: true,
      isLoading: false
    })
  }

  setCurrentAlbumData = album => {
    this.setState({
      currentAlbum: album,
      queue: album.tracks,
      isShuffle: false
    })
  }

  render () {
    const { children } = this.props

    const value = this.state

    return (
      <PlayerContext.Provider {...{ value }}>{children}</PlayerContext.Provider>
    )
  }
}
