import axios from 'axios'
import store from '&/store'

export default function ({ otherProfileId, content, tracks, images }) {
  this.error = null
  this.isLoading = true

  const profileId =
    store.state.profile.info.id
  const url =
    `/profiles/${profileId}/posts`

  const { token } = store.state.profile
  const params = {
    other_profile_id: otherProfileId,
    token,
    content,
    tracks,
    images
  }

  const handleSuccess = response => {
    this.postData = response.data.post
  }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  axios
    .post(url, params)
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
