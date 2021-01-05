export default function getData (direction) {
  const { getTrack, currentAlbum, currentAlbumTrackIndex } = this.props

  this.setState({ isError: false, isLoading: true })

  const index = () => {
    if (direction === 'backward') {
      return currentAlbumTrackIndex - 1
    } else if (direction === 'forward') {
      return currentAlbumTrackIndex + 1
    }
  }

  const track = currentAlbum.tracks[index()]

  const handleSuccess = () => {
    const { setContext } = this.props

    this.setState({ isLoading: false })

    setContext({ currentAlbumTrackIndex: index() })
  }

  const handleError = () => {
    const errorState = { isError: true, isLoading: false }

    this.setState(errorState)
  }

  getTrack(track).then(handleSuccess).catch(handleError)
}
