import axios from 'axios'
import { handleEnvError } from '#/utils'
import formatRequestUrl from './formatters/requestUrl'

export default function ({
  artistName,
  artistId,
  sourceId = 'lastfm',
  albumType = '',
  scope = '',
  page,
  limit
}) {
  this.isLoading = true

  const urlFormatted = formatRequestUrl({
    sourceId,
    artistName,
    artistId,
    scope
  })

  const params = {
    ...(page && { page }),
    ...(limit && { limit }),
    ...(albumType && {
      album_type: albumType
    })
  }

  const handleSuccess = response => {
    const { artist } = response.data

    this.error = null
    this.artistData = artist

    if (scope === 'tracks') {
      this.topTrackCount ||=
        artist.tracks[0].listeners_count
    }
  }

  const handleError = error => {
    this.error = error

    handleEnvError(error)
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios
    .get(urlFormatted, { params })
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
