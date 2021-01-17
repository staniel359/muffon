export default function checkArtistChange (prevProps) {
  const { params } = this.props.match

  const prevParams = prevProps.match.params

  const isArtistChanged = params.artistName !== prevParams.artistName

  if (isArtistChanged) {
    this.setState({ data: null, artist: null, isLoaded: false })

    this.getData()
  }
}
