import axios from 'axios'
import store from '&/store'

export default function ({ postId, content, tracks, images }) {
  this.error = null
  this.isLoading = true

  const profileId =
    store.state.profile.info.id
  const url =
    `/profiles/${profileId}/posts/${postId}`

  const { token } = store.state.profile
  const params = {
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

  axios.patch(
    url, params
  ).then(
    handleSuccess
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
