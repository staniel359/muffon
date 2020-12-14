export default function getData () {
  const { track, getTrack, updateCurrentTrack } = this.props

  this.setState({ isLoading: true })

  const getTrackParams = {
    artistName: track.artist,
    trackTitle: track.title
  }

  const handleSuccess = () => {
    updateCurrentTrack({ id: track.id, isPlaying: true })

    this._isMounted && this.setState({ isLoading: false })
  }

  const handleError = () => {
    const errorState = { isError: true, isLoading: false }

    this._isMounted && this.setState(errorState)
  }

  getTrack(getTrackParams).then(handleSuccess).catch(handleError)
}
