import axios from 'axios'

export default function ({ scope, modelName, modelScope }) {
  this.error = null
  this.isLoading = true

  const url =
    `/radio/${scope}/${modelName}/${modelScope}`
  const params = {}

  const handleSuccess = response => {
    this.radioData = response.data.radio
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
