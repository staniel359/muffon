import store from '@/plugins/store'
import postRequest from '@/helpers/actions/api/request/post'
import {
  handleError as handleFormError
} from '@/helpers/actions/form'

export default function (
  {
    title,
    image,
    isPrivate
  }
) {
  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/playlists`

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
    this.playlistId =
      response.data.playlist.id
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
      isWithSelfToken: true,
      onSuccess: handleSuccess,
      onError: handleError
    }
  )
}
