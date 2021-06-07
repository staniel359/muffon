import fetchBandcampIdData from '#/actions/api/id/bandcamp/fetchData'
import { handleEnvError } from '#/utils'

export default function ({ model, artistName, title, paramsData }) {
  this.isLoading = true

  const bandcampIdDataArgs = { model, artistName, title }

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

    handleEnvError(error)
  }

  return fetchBandcampIdData(bandcampIdDataArgs)
    .then(handleSuccess)
    .catch(handleError)
}
