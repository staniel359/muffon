export default function checkAlbumChange (prevProps) {
  const { params } = this.props.match

  const prevParams = prevProps.match.params

  const isArtistNameChanged = params.artistName !== prevParams.artistName
  const isTrackTitleChanged = params.trackTitle !== prevParams.trackTitle

  const isTrackChanged = isArtistNameChanged || isTrackTitleChanged

  if (isTrackChanged) {
    this.setState({ data: null, track: null, isLoaded: false })

    this.getData()
  }
}
