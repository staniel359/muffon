import getBandcampId from '*/helpers/actions/api/bandcampId/get'

export default function (
  {
    artistName
  }
) {
  const bandcampIdArgs = {
    model: 'artist',
    artist: artistName
  }

  const handleSuccess = (
    response
  ) => {
    const idData = response.id
    const artistId = idData.bandcamp_id

    this.requestArtistData = {
      sourceId: 'bandcamp',
      artistId
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
