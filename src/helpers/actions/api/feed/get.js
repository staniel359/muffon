import axios from 'axios'
import store from '*/plugins/store'

export default function (
  {
    page,
    limit
  }
) {
  this.error = null
  this.isLoading = true

  const profileId =
    store.state.profile.info.id

  const url = `/profiles/${profileId}/feed`

  const params = {
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

  axios.get(
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
