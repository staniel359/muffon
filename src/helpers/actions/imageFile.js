import {
  ipcRenderer
} from 'electron'

export async function getLink (
  filePath
) {
  function getFile () {
    return ipcRenderer.invoke(
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
