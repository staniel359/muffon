import {
  existsSync,
  unlinkSync
} from 'fs'

export default function deleteFile (
  filePath
) {
  const isFileExist =
    existsSync(
      filePath
    )

  if (isFileExist) {
    return unlinkSync(
      filePath
    )
  } else {
    return () => {}
  }
}
