import fetchBandcampIdData from '#/actions/api/id/bandcamp/fetchData'

export default function ({ artistName }) {
  this.isLoading = true

  const bandcampIdDataArgs = {
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

  return fetchBandcampIdData(bandcampIdDataArgs)
    .then(handleSuccess)
    .catch(handleError)
}
