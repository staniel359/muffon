import getBandcampId from '*/helpers/actions/api/bandcampId/get'

export default function (
  {
    artist,
    track
  }
) {
  const bandcampIdArgs = {
    model: 'track',
    artist,
    title: track
  }

  const handleSuccess = (
    response
  ) => {
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

  return getBandcampId.bind(
    this
  )(
    bandcampIdArgs
  ).then(
    handleSuccess
  )
}
