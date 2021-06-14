import axios from 'axios'
import { handleEnvError } from '#/utils'

export default function ({ channelId, scope = '', page, limit }) {
  this.isLoading = true

  const url = `/youtube/channels/${channelId}/${scope}`

  const params = {
    ...(page && { page }),
    ...(limit && { limit })
  }

  const handleSuccess = response => {
    this.error = null
    this.channelData = response.data.channel
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
