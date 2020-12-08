export default function handleTrackChange (prevProps) {
  const { artistName, trackTitle } = this.params()

  const prevArtistName = prevProps.match.params.artistName
  const isArtistNameChanged = artistName !== prevArtistName

  const prevTrackTitle = prevProps.match.params.trackTitle
  const isTrackTitleChanged = trackTitle !== prevTrackTitle

  const isTrackChanged = isArtistNameChanged || isTrackTitleChanged

  if (isTrackChanged) {
    this.setNavSections(artistName, trackTitle)
    this.setState({ data: null, isLoaded: false })
    this.getData()
  }
}
