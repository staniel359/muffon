import fetchBandcampIdData from '#/actions/api/id/bandcamp/fetchData'

export default function ({ model, artistName, albumTitle, paramsData }) {
  this.isLoading = true

  const bandcampIdDataArgs = {
    model,
    artistName,
    title: albumTitle
  }

  const handleSuccess = response => {
    this.isLoading = false

    const idData = response.id

    this.requestAlbumData = {
      sourceId: 'bandcamp',
      albumId: idData.bandcamp_id,
      artistId: idData.artists[0].bandcamp_id,
      paramsData
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
