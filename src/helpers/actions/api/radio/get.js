import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    scope,
    modelName,
    modelScope,
    isScopeWithModel
  }
) {
  function formatUrl () {
    if (isScopeWithModel) {
      return `/radio/${scope}/${modelName}/${modelScope}`
    } else {
      return `/radio/${scope}/${modelScope}`
    }
  }

  const url = formatUrl()

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
      isWithSelfId: true,
      isWithSelfToken: true,
      onSuccess: handleSuccess
    }
  )
}
