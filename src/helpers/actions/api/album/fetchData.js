import axios from 'axios'
import { raiseProductionError } from '#/utils'
import formatRequestUrl from './formatters/requestUrl'

export default function ({
  sourceId = 'lastfm',
  artistName,
  albumTitle,
  artistId,
  albumId,
  albumType = 'album',
  paramsData,
  scope = '',
  page,
  limit
}) {
  this.isLoading = true

  const urlFormatted = formatRequestUrl({
    sourceId,
    artistName,
    albumTitle,
    artistId,
    albumId,
    albumType
  })

  const url = `${urlFormatted}/${scope}`

  const params = {
    ...paramsData,
    ...(page && { page }),
    ...(limit && { limit })
  }

  const handleSuccess = response => {
    this.error = null
    this.albumData = response.data[albumType]
  }

  const handleError = error => {
    this.error = error

    raiseProductionError(error)
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios
    .get(url, { params })
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
