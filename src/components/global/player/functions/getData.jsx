export default function getData () {
  const { track, getTrack } = this.props

  this.setState({ isError: false, isLoading: true })

  const handleSuccess = () => {
    this._isMounted && this.setState({ isLoading: false })
  }

  const handleError = () => {
    const errorState = { isError: true, isLoading: false }

    this._isMounted && this.setState(errorState)
  }

  getTrack(track).then(handleSuccess).catch(handleError)
}
