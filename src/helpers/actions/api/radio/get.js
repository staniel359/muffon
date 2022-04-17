import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    scope,
    modelName,
    modelScope
  }
) {
  const url =
    `/radio/${scope}/${modelName}/${modelScope}`

  const handleSuccess = (
    response
  ) => {
    this.radioData =
      response.data.radio
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      onSuccess: handleSuccess
    }
  )
}
