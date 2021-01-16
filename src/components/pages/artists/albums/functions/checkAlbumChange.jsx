export default function checkAlbumChange (prevProps) {
  const { params } = this.props.match

  const prevParams = prevProps.match.params

  const isArtistNameChanged = params.artistName !== prevParams.artistName
  const isAlbumTitleChanged = params.albumTitle !== prevParams.albumTitle

  const isAlbumChanged = isArtistNameChanged || isAlbumTitleChanged

  if (isAlbumChanged) {
    this.setState({ data: null, isLoaded: false })

    this.getData()
  }
}
