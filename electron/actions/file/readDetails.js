import {
  existsSync,
  statSync
} from 'fs'

export default function (
  filePath
) {
  const isFileExist =
    existsSync(
      filePath
    )

  if (isFileExist) {
    return statSync(
      filePath
    )
  }
}
