import axios from 'axios'

export default function (
  {
    scope,
    modelName,
    modelScope
  }
) {
  this.error = null
  this.isLoading = true

  const url =
    `/radio/${scope}/${modelName}/${modelScope}`

  const handleSuccess = (
    response
  ) => {
    this.radioData =
      response.data.radio
  }

  const handleError = (
    error
  ) => {
    this.error = error

    throw error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios.get(
    url
  ).then(
    handleSuccess
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
