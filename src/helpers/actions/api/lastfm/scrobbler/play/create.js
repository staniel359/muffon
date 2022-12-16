import profileStore from '@/stores/profile'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    title,
    artistName,
    albumTitle,
    duration
  }
) {
  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/lastfm/scrobbler/play`

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
