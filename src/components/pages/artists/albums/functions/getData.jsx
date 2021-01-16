export default function getData () {
  const { requestData } = this.props.location
  const { artistName, albumTitle } = this.props.match.params
  const { dataName } = this

  const initialData = {
    sourceId: 'lastfm',
    artist: artistName,
    title: albumTitle
  }

  const album = requestData || initialData

  this.getAlbumData({ album, dataName })
}
