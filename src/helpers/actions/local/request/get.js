import {
  sortByCreated
} from '@/helpers/utils'

export default function (
  {
    key,
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

    return onSuccess(
      collection
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
