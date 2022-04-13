import axios from 'axios'

export default function (
  {
    query,
    profileId,
    scope = '',
    page,
    limit
  }
) {
  this.error = null
  this.isLoading = true

  const url =
    `/profiles/${profileId}/library/search/${scope}`

  const params = {
    query,
    ...(page && {
      page
    }),
    ...(limit && {
      limit
    })
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
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios.get(
    url,
    {
      params
    }
  ).then(
    handleSuccess
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
