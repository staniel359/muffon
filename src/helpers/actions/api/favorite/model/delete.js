import store from '*/plugins/store'
import deleteRequest from '*/helpers/actions/api/request/delete'

export default function (
  {
    model,
    favoriteId
  }
) {
  const profileId =
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}` +
    `/favorites/${model}s/${favoriteId}`

  const {
    token
  } = store.state.profile

  const params = {
    token
  }

  const handleError = (
    error
  ) => {
    this.error = error

    throw error
  }

  return deleteRequest.bind(
    this
  )(
    {
      url,
      params,
      onError: handleError
    }
  )
}
