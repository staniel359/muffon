import axios from 'axios'
import store from '*/plugins/store'
import { addFormErrors } from '*/helpers/actions'

export default function ({ title, description, image }) {
  this.error = null
  this.isLoading = true

  const url = '/communities'

  const profileId =
    store.state.profile.info.id

  const { token } = store.state.profile

  const params = {
    profile_id: profileId,
    token,
    title,
    description,
    image
  }

  const handleSuccess = response => {
    this.communityId =
      response.data.community_id
  }

  const handleError = error => {
    const isBadRequest =
      error.response?.status === 403

    if (isBadRequest) {
      const fields = [
        'title',
        'description'
      ]

      addFormErrors({
        error,
        fields,
        form: this.form
      })
    } else {
      this.error = error
    }
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  axios.post(
    url, params
  ).then(
    handleSuccess
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
