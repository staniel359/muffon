export default function getData () {
  const { track, getTrack } = this.props

  this.setState({ isError: false, isLoading: true })

  const handleSuccess = () => {
    const { setCurrentAlbumData } = this.props

    this._isMounted && this.setState({ isLoading: false })

    setCurrentAlbumData && setCurrentAlbumData()
  }

  const handleError = () => {
    const errorState = { isError: true, isLoading: false }

    this._isMounted && this.setState(errorState)
  }

  getTrack(track).then(handleSuccess).catch(handleError)
}
