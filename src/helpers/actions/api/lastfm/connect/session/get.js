import axios from 'axios'
import store from '*/plugins/store'
import {
  updateStore
} from '*/helpers/actions'

export default function (
  {
    token
  }
) {
  this.error = null
  this.isLoading = true

  const url = '/lastfm/connect/session'

  const profileId =
    store.state.profile.info.id
  const params = {
    profile_id: profileId,
    token
  }

  const handleSuccess = (
    response
  ) => {
    const storeProfileInfo =
      store.state.profile.info

    const profileData =
      response.data.profile

    const newProfileInfo = {
      ...storeProfileInfo,
      ...profileData
    }

    updateStore(
      {
        'profile.info': newProfileInfo
      }
    )
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
