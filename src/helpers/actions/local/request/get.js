import {
  sortByCreated
} from '@/helpers/utils'

export default function (
  {
    key,
    listScope,
    order,
    onSuccess
  }
) {
  this.error = null
  this.isLoading = true

  const handleComplete = () => {
    this.isLoading = false
  }

  function handleSuccess (
    result
  ) {
    const collection =
      sortByCreated(
        {
          collection: result,
          order
        }
      )

    const response = {
      page: 1,
      total_pages: 1,
      [listScope]: collection
    }

    return onSuccess(
      response
    )
  }

  const handleError = (
    error
  ) => {
    this.error = error
  }

  return window
    .mainProcess
    .sendAsyncCommand(
      'get-settings-key',
      key
    ).finally(
      handleComplete
    ).then(
      handleSuccess
    ).catch(
      handleError
    )
}
