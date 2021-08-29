import axios from 'axios'
import store from '*/store'
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

  const url = formatRequestUrl({
    sourceId,
    artistName,
    artistId,
    scope
  })

  const profileId =
    store.state.profile.info.id
  const params = {
    profile_id: profileId,
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
    .get(url, { params })
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
