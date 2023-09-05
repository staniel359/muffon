import profileStore from '@/stores/profile'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    action,
    title,
    artistName,
    albumTitle,
    duration
  }
) {
  const profileId = profileStore().id

  const url = (
    `/profiles/${profileId}` +
    `/lastfm/scrobbler/${action}`
  )

  const params = {
    track_title: title,
    artist_name: artistName,
    album_title: albumTitle,
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
