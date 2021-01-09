export default function stopAudio () {
  const resetAudio = () => {
    this.setState({
      audioStatus: 'stop',
      currentTime: 0,
      secondsLoaded: 0
    })
  }

  const resetCurrentTrack = () => {
    this.setState({
      currentTrack: null,
      currentTrackId: null,
      currentTrackAudioId: null,
      currentTrackSource: null,
      currentTrackVariants: null
    })
  }

  const resetCurrentAlbum = () => {
    this.setState({ currentAlbum: null })
  }

  const resetQueue = () => {
    this.setState({ queue: null, isShuffle: false })
  }

  const hideAudioPanels = () => {
    this.setState({
      isPlayerPanelVisible: false,
      isQueuePanelVisible: false
    })
  }

  resetAudio()
  resetCurrentTrack()
  resetCurrentAlbum()
  resetQueue()
  hideAudioPanels()

  this.audio().src = ''

  this.request.cancel()
}
