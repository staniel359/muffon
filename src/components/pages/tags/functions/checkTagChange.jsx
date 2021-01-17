export default function checkTagChange (prevProps) {
  const { params } = this.props.match

  const prevParams = prevProps.match.params

  const isTagChanged = params.tagName !== prevParams.tagName

  if (isTagChanged) {
    this.setState({
      tag: null,
      data: null,
      isLoaded: false,
      artistImages: null
    })

    this.getData()
  }
}
