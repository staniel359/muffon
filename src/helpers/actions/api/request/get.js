import axios from 'axios'

export default function (
  {
    url,
    params = {},
    page,
    limit,
    onComplete,
    onSuccess,
    onError
  }
) {
  if (this) {
    this.error = null
    this.isLoading = true
  }

  const paramsData = {
    ...params,
    ...(page && {
      page
    }),
    ...(limit && {
      limit
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

  function handleSuccess (
    response
  ) {
    return onSuccess(
      response
    )
  }

  const handleError = (
    error
  ) => {
    if (this) {
      this.error = error
    }

    if (onError) {
      return onError(
        error
      )
    } else {
      throw error
    }
  }

  return axios.get(
    url,
    {
      params: paramsData
    }
  ).finally(
    handleComplete
  ).then(
    handleSuccess
  ).catch(
    handleError
  )
}
