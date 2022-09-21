import store from '@/plugins/store'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    albumTitle,
    artistName,
    imageUrl
  }
) {
  this.favoriteId = null

  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/favorites/albums`

  const params = {
    title: albumTitle,
    artist: artistName,
    image: imageUrl
  }

  const handleSuccess = (
    response
  ) => {
    this.favoriteId =
      response.data.favorite_album.id.toString()
  }

  return postRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfToken: true,
      onSuccess: handleSuccess
    }
  )
}
