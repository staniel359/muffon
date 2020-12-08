export default function handleAlbumChange (prevProps) {
  const { artistName, albumTitle } = this.params()

  const prevArtistName = prevProps.match.params.artistName
  const isArtistNameChanged = artistName !== prevArtistName

  const prevAlbumTitle = prevProps.match.params.albumTitle
  const isAlbumTitleChanged = albumTitle !== prevAlbumTitle

  const isAlbumChanged = isArtistNameChanged || isAlbumTitleChanged

  if (isAlbumChanged) {
    this.setNavSections(artistName, albumTitle)
    this.setState({ data: null, isLoaded: false })
    this.getData()
  }
}
