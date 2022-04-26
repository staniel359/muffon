import axios from 'axios'
import store from '*/plugins/store'

export default function (
  {
    url,
    params = {},
    isWithSelfId,
    isWithSelfToken,
    isWithSelfLanguage,
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

  const profileId =
    store.getters['profile/id']

  const {
    token,
    language
  } = store.state.profile

  const paramsData = {
    ...params,
    ...(isWithSelfId && {
      profile_id: profileId
    }),
    ...(isWithSelfToken && {
      token
    }),
    ...(isWithSelfLanguage && {
      language
    }),
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
