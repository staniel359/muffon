import readFile from '../../actions/file/read.js'
import readFileDetails from '../../actions/file/readDetails.js'
import decryptFile from '../../actions/file/decrypt.js'

export function handleReadFile (
  _,
  {
    filePath
  }
) {
  return readFile(
    filePath
  )
}

export function handleReadFileDetails (
  _,
  {
    filePath
  }
) {
  return readFileDetails(
    filePath
  )
}

export function handleDecryptFile (
  _,
  {
    filePath,
    key,
    iv
  }
) {
  return decryptFile(
    {
      filePath,
      key,
      iv
    }
  )
}
