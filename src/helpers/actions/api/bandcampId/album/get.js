import getBandcampId from '*/helpers/actions/api/bandcampId/get'

export default function (
  {
    model,
    artist,
    album,
    paramsData
  }
) {
  const bandcampIdArgs = {
    model,
    artist,
    title: album
  }

  const handleSuccess = (
    data
  ) => {
    const idData = data.id

    const albumId = idData.bandcamp_id
    const artistId =
      idData.artists[0].bandcamp_id

    this.requestAlbumData = {
      sourceId: 'bandcamp',
      albumId,
      artistId,
      paramsData
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
