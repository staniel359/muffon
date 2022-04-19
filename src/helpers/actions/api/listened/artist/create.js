import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    artistName
  }
) {
  this.listenedId = null

  const profileId =
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}/listened/artists`

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
    this.listenedId =
      response.data.listened_id.toString()
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
