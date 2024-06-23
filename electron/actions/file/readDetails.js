import {
  existsSync,
  statSync
} from 'node:fs'

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
