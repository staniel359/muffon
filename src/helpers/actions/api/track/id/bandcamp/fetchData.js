import fetchBandcampIdData from '#/actions/api/id/bandcamp/fetchData'

export default function ({ artist, track }) {
  this.error = null
  this.isLoading = true

  const bandcampIdDataArgs = {
    model: 'track',
    artist,
    title: track
  }

  const handleSuccess = response => {
    this.isLoading = false

    const idData = response.id
    const artistId =
      idData.artists[0].bandcamp_id
    const trackId = idData.bandcamp_id

    this.requestTrackData = {
      sourceId: 'bandcamp',
      artistId,
      trackId
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
