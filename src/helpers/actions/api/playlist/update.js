import store from '@/plugins/store'
import patchRequest from '@/helpers/actions/api/request/patch'
import {
  handleError as handleFormError
} from '@/helpers/actions/form'

export default function (
  {
    playlistId,
    title,
    image,
    isPrivate
  }
) {
  this.playlistData = null

  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/playlists/${playlistId}`

  const params = {
    title,
    image,
    private: (
      isPrivate ? 1 : 0
    )
  }

  const handleSuccess = (
    response
  ) => {
    this.playlistData =
      response.data.playlist
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
