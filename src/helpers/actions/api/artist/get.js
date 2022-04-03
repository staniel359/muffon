import axios from 'axios'
import store from '*/plugins/store'
import formatArtistRequestUrl from '*/helpers/formatters/request/artist/url'

export default function ({
  artistName,
  artistId,
  sourceId = 'lastfm',
  albumType = '',
  scope = '',
  page,
  limit
}) {
  this.error = null
  this.isLoading = true

  const url =
    formatArtistRequestUrl({
      sourceId,
      artistName,
      artistId,
      scope
    })

  const profileId =
    store.state.profile.info.id
  const lang =
    store.state.profile.language

  const params = {
    profile_id: profileId,
    lang,
    ...(page && { page }),
    ...(limit && { limit }),
    ...(albumType && {
      album_type: albumType
    })
  }

  const handleSuccess = response => {
    const { artist } = response.data

    this.artistData = artist

    if (scope === 'tracks') {
      this.topTrackCount ||=
        artist.tracks[0].listeners_count
    }
  }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios.get(
    url, { params }
  ).then(
    handleSuccess
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
