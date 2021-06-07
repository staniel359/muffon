import axios from 'axios'
import { handleEnvError } from '#/utils'

export default function ({
  sourceId = 'lastfm',
  scope = '',
  query,
  page,
  limit
}) {
  this.isLoading = true

  const url = `${sourceId}/search/${scope}`

  const params = {
    query,
    ...(page && { page }),
    ...(limit && { limit })
  }

  const handleSuccess = response => {
    this.error = null
    this.searchData = response.data.search
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
