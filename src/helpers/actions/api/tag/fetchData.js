import axios from 'axios'
import store from '&/store'

export default function ({ tagName, scope = '', page, limit }) {
  this.isLoading = true

  const tagNameEncoded = encodeURIComponent(tagName)
  const url = `/lastfm/tags/${tagNameEncoded}/${scope}`

  const profileId =
    store.state.profile.info.id
  const lang =
    store.state.profile.language

  const params = {
    profile_id: profileId,
    lang,
    ...(page && { page }),
    ...(limit && { limit })
  }

  const handleSuccess = response => {
    this.error = null
    this.tagData = response.data.tag
  }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios
    .get(url, { params })
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
