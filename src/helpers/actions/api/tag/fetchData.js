import axios from 'axios'
import store from '*/store'
import { handleEnvError } from '#/utils'

export default function ({ tagName, scope = '', page, limit }) {
  this.isLoading = true

  const tagNameEncoded = encodeURIComponent(tagName)
  const url = `/lastfm/tags/${tagNameEncoded}/${scope}`

  const profileId =
    store.state.profile.info.id
  const params = {
    profile_id: profileId,
    ...(page && { page }),
    ...(limit && { limit })
  }

  const handleSuccess = response => {
    this.error = null
    this.tagData = response.data.tag
  }

  const handleError = error => {
    this.error = error

    handleEnvError(error)
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
