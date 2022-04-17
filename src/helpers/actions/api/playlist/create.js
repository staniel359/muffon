import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'
import {
  handleError as handleFormError
} from '*/helpers/actions/form'

export default function (
  {
    title,
    image
  }
) {
  const profileId =
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}/playlists`

  const {
    token
  } = store.state.profile

  const params = {
    token,
    title,
    image
  }

  const handleSuccess = (
    response
  ) => {
    this.playlistId =
      response.data.playlist_id
  }

  const handleError = (
    error
  ) => {
    handleFormError.bind(
      this
    )(
      {
        error
      }
    )
  }

  return postRequest.bind(
    this
  )(
    {
      url,
      params,
      onSuccess: handleSuccess,
      onError: handleError
    }
  )
}
