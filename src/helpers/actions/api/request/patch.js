import axios from 'axios'

export default function (
  {
    url,
    params = {},
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
    params
  ).finally(
    handleComplete
  ).then(
    handleSuccess
  ).catch(
    handleError
  )
}
