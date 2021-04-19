import fetchBandcampIdData from '#/actions/api/id/bandcamp/fetchData'
import { raiseProductionError } from '#/utils'

export default function ({ model, artistName, title, paramsData }) {
  this.isLoading = true

  const bandcampIdDataArgs = { model, artistName, title }

  const handleSuccess = response => {
    this.isLoading = false
    this.requestAlbumData = {
      sourceId: 'bandcamp',
      albumId: response.id,
      artistId: response.artist_id,
      paramsData
    }
  }

  const handleError = error => {
    this.isLoading = false
    this.error = error

    raiseProductionError(error)
  }

  return fetchBandcampIdData(bandcampIdDataArgs)
    .then(handleSuccess)
    .catch(handleError)
}
