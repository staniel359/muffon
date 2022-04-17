import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    trackTitle,
    artistName,
    albumTitle,
    imageUrl
  }
) {
  const profileId =
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}/favorites/tracks`

  const {
    token
  } = store.state.profile

  const params = {
    token,
    title: trackTitle,
    artist_name: artistName,
    album_title: albumTitle,
    image_url: imageUrl
  }

  return postRequest.bind(
    this
  )(
    {
      url,
      params
    }
  )
}
