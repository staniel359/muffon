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

  const hideAudioPanels = () => {
    this.setState({
      isPlayerPanelVisible: false,
      isQueuePanelVisible: false
    })
  }

  resetAudio()
  resetCurrentTrack()
  this.resetQueue()
  hideAudioPanels()

  this.audio().src = ''

  this.request.cancel()
}
