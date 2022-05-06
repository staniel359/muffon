import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    artistName
  }
) {
  this.favoriteId = null

  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/favorites/artists`

  const params = {
    name: artistName
  }

  const handleSuccess = (
    response
  ) => {
    this.favoriteId =
      response.data.favorite_artist.id.toString()
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
