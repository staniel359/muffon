import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    scope,
    modelName,
    modelScope
  }
) {
  function formatUrl () {
    if (scope === 'top') {
      return `/radio/${scope}/${modelScope}`
    } else {
      return `/radio/${scope}/${modelName}/${modelScope}`
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
      onSuccess: handleSuccess
    }
  )
}
