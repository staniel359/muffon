import axios from 'axios'
import { shell } from 'electron'

export default function () {
  this.error = null
  this.isLoading = true

  const url = 'lastfm/connect/token'

  const handleSuccess = response => {
    this.isReset = false

    const { token, link } =
      response.data.connect

    this.token = token

    shell.openExternal(link)
  }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  axios
    .get(url)
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
