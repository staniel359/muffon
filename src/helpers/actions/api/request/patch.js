import axios from 'axios'
import store from '*/plugins/store'

export default function (
  {
    url,
    params = {},
    isWithSelfId,
    isWithSelfToken,
    onComplete,
    onSuccess,
    onError
  }
) {
  if (this) {
    this.error = null
    this.isError = false
    this.isSuccess = false
    this.isLoading = true
  }

  const profileId =
    store.getters['profile/id']

  const {
    token
  } = store.state.profile

  const paramsData = {
    ...params,
    ...(isWithSelfId && {
      profile_id: profileId
    }),
    ...(isWithSelfToken && {
      token
    })
  }

  const handleComplete = () => {
    if (this) {
      this.isLoading = false
    }

    if (onComplete) {
      return onComplete()
    }
  }

  const handleSuccess = (
    response
  ) => {
    if (this) {
      this.isSuccess = true
    }

    if (onSuccess) {
      return onSuccess(
        response
      )
    } else {
      return response
    }
  }

  const handleError = (
    error
  ) => {
    if (this) {
      this.isError = true
    }

    if (onError) {
      return onError(
        error
      )
    } else {
      throw error
    }
  }

  return axios.patch(
    url,
    paramsData
  ).finally(
    handleComplete
  ).then(
    handleSuccess
  ).catch(
    handleError
  )
}
