import {
  snakeCase
} from 'change-case'
import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    scope
  }
) {
  const scopeFormatted =
    snakeCase(
      scope
    )

  const url = `/legal/${scopeFormatted}`

  const handleSuccess = (
    response
  ) => {
    this.legalData =
      response.data.legal
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
