import {
  ipcRenderer
} from 'electron'

export async function decrypt (
  {
    filePath,
    key,
    iv
  }
) {
  function getDecryptedFile () {
    return ipcRenderer.invoke(
      'decrypt-file',
      {
        filePath,
        key,
        iv
      }
    )
  }

  const data =
    await getDecryptedFile()

  const blob = new Blob(
    [
      data
    ]
  )

  return URL.createObjectURL(
    blob
  )
}
