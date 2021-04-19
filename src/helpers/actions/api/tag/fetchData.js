import axios from 'axios'
import { raiseProductionError } from '#/utils'

export default function ({ tagName, scope = '', page, limit }) {
  this.isLoading = true

  const tagNameEncoded = encodeURIComponent(tagName)
  const url = `/lastfm/tags/${tagNameEncoded}/${scope}`

  const params = {
    ...(page && { page }),
    ...(limit && { limit })
  }

  const handleSuccess = response => {
    this.error = null
    this.tagData = response.data.tag
  }

  const handleError = error => {
    this.tagData = null
    this.error = error

    raiseProductionError(error)
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
