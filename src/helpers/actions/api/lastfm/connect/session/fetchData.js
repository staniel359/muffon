import axios from 'axios'
import store from '*/store'
import { setGlobalData } from '#/actions'

export default function ({ token }) {
  this.error = null
  this.isLoading = true

  const url = 'lastfm/connect/session'

  const profileId =
    store.state.profile.info.id
  const params = {
    profile_id: profileId,
    token
  }

  const handleError = error => {
    this.error = error
  }

  const handleSuccess = response => {
    const localProfileInfo =
      store.state.profile.info
    const profileData =
      response.data.profile

    const newProfileInfo = {
      ...localProfileInfo,
      ...profileData
    }

    setGlobalData({
      'profile.info': newProfileInfo
    })
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  axios
    .get(url, { params })
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
