import store from '*/plugins/store'
import patchRequest from '*/helpers/actions/api/request/patch'
import {
  handleError as handleFormError
} from '*/helpers/actions/form'

export default function (
  {
    playlistId,
    title,
    image
  }
) {
  this.profileData = null

  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/playlists/${playlistId}`

  const params = {
    title,
    image
  }

  const handleSuccess = (
    response
  ) => {
    this.profileData =
      response.data.profile
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

  return patchRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfToken: true,
      onSuccess: handleSuccess,
      onError: handleError
    }
  )
}
