import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    albumTitle,
    artistName,
    imageUrl
  }
) {
  this.favoriteId = null

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

  const handleSuccess = (
    response
  ) => {
    this.favoriteId =
      response.data.favorite_id.toString()
  }

  return postRequest.bind(
    this
  )(
    {
      url,
      params,
      onSuccess: handleSuccess
    }
  )
}
