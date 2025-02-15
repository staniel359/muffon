export async function getLink (
  filePath
) {
  function getFile () {
    return window
      .mainProcess
      .sendAsyncCommand(
        'read-file',
        {
          filePath
        }
      )
  }

  const data = await getFile()

  const blob = new Blob(
    [
      data
    ]
  )

  return URL.createObjectURL(
    blob
  )
}
