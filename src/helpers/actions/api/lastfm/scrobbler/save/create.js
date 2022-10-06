import store from '@/plugins/store'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    title,
    artistName,
    albumTitle,
    duration
  }
) {
  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/lastfm/scrobbler/save`

  const params = {
    title,
    artist: artistName,
    album: albumTitle,
    duration
  }

  return postRequest(
    {
      url,
      params,
      isWithSelfToken: true
    }
  )
}
