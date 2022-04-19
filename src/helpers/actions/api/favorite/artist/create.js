import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    artistName
  }
) {
  this.favoriteId = null

  const profileId =
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}/favorites/artists`

  const {
    token
  } = store.state.profile

  const params = {
    token,
    name: artistName
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
