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

  if (result) {
    const blob = new Blob(
      [
        result
      ]
    )

    return URL.createObjectURL(
      blob
    )
  } else {
    throw new Error()
  }
}
