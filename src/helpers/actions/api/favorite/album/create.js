import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    albumTitle,
    artistName,
    imageUrl
  }
) {
  const profileId =
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}/favorites/albums`

  const {
    token
  } = store.state.profile

  const params = {
    token,
    title: albumTitle,
    artist_name: artistName,
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
