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
  this.favoriteId = null

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
