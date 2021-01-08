export default function getData (direction) {
  const { getQueueNextTrack } = this.props

  this.setState({ isError: false, isLoading: true })

  const handleSuccess = () => this.setState({ isLoading: false })

  const handleError = () => {
    const errorState = { isError: true, isLoading: false }

    this.setState(errorState)
  }

  getQueueNextTrack(direction).then(handleSuccess).catch(handleError)
}
