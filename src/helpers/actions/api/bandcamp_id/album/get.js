import getBandcampId from '*/helpers/actions/api/bandcamp_id/get'

export default function ({ model, artist, album, paramsData }) {
  this.error = null
  this.isLoading = true

  const bandcampIdArgs = {
    model,
    artist,
    title: album
  }

  const handleSuccess = response => {
    this.isLoading = false

    const idData = response.id

    this.requestAlbumData = {
      sourceId: 'bandcamp',
      albumId: idData.bandcamp_id,
      artistId:
        idData.artists[0].bandcamp_id,
      paramsData
    }
  }

  const handleError = error => {
    this.isLoading = false
    this.error = error
  }

  return getBandcampId(
    bandcampIdArgs
  ).then(
    handleSuccess
  ).catch(
    handleError
  )
}
