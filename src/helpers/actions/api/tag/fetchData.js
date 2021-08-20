import axios from 'axios'
import { handleEnvError } from '#/utils'

export default function ({ tagName, scope = '', profileId, page, limit }) {
  this.isLoading = true

  const tagNameEncoded = encodeURIComponent(tagName)
  const url = `/lastfm/tags/${tagNameEncoded}/${scope}`

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
