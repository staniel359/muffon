import getBandcampId from '*/helpers/actions/api/bandcampId/get'

export default function ({ artistName }) {
  this.error = null
  this.isLoading = true

  const bandcampIdArgs = {
    model: 'artist',
    artist: artistName
  }

  const handleSuccess = response => {
    this.isLoading = false

    const idData = response.id
    const artistId = idData.bandcamp_id

    this.requestArtistData = {
      sourceId: 'bandcamp',
      artistId
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
