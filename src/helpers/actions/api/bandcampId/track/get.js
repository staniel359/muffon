import getBandcampId from '*/helpers/actions/api/bandcampId/get'

export default function (
  {
    artist,
    track
  }
) {
  this.error = null
  this.isLoading = true

  const bandcampIdArgs = {
    model: 'track',
    artist,
    title: track
  }

  const handleSuccess = (
    response
  ) => {
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

  const handleError = (
    error
  ) => {
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
