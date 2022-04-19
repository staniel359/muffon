import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    artistName
  }
) {
  this.libraryId = null

  const profileId =
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}/library/artists`

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
    this.libraryId =
      response.data.library_id.toString()
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
