import profileStore from '@/stores/profile'
import postRequest from '@/helpers/actions/api/request/post'
import {
  handleError as handleFormError
} from '@/helpers/actions/form'

export default function (
  {
    title,
    description,
    image,
    isPrivate,
    isForm
  }
) {
  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/playlists`

  const params = {
    title,
    description,
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
      onSuccess: (
        isForm && handleSuccess
      ),
      onError: (
        isForm && handleError
      )
    }
  )
}
