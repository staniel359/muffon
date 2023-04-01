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
    const decryptArgs = {
      filePath,
      key,
      iv
    }

    return ipcRenderer.invoke(
      'decrypt-file',
      decryptArgs
    )
  }

  const result =
    await getDecryptedFile()

  const blob = new Blob(
    [
      result
    ]
  )

  return URL.createObjectURL(
    blob
  )
}
