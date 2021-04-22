import axios from 'axios'
import { pathCase } from 'path-case'
import { raiseProductionError } from '#/utils'

export default function ({
  sourceId = 'lastfm',
  scope = '',
  query,
  page,
  limit
}) {
  this.isLoading = true

  const sourceIdFormatted = pathCase(sourceId)
  const url = `${sourceIdFormatted}/search/${scope}`

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
    this.searchData = null
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
