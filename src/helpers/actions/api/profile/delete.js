import profileStore from '@/stores/profile'
import deleteRequest from '@/helpers/actions/api/request/delete'
import {
  handleError as handleFormError
} from '@/helpers/actions/form'

export default function (
  {
    password
  }
) {
  const profileId = profileStore().id

  const url = `/profiles/${profileId}`

  const params = {
    password
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

  return deleteRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfToken: true,
      onError: handleError
    }
  )
}
