import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    trackTitle,
    artistName,
    albumTitle,
    image,
    imageUrl,
    created
  }
) {
  const profileId =
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}/library/tracks`

  const {
    token
  } = store.state.profile

  const params = {
    token,
    title: trackTitle,
    artist_name: artistName,
    album_title: albumTitle,
    image,
    image_url: imageUrl,
    created_at: created
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
