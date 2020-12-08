export default function handleArtistChange (prevProps) {
  const { artistName } = this.params()

  const prevArtistName = prevProps.match.params.artistName
  const isArtistChanged = artistName !== prevArtistName

  if (isArtistChanged) {
    this.setNavSections(artistName)
    this.setState({ data: null, isLoaded: false })
    this.getData()
  }
}
