import {
  existsSync,
  unlinkSync
} from 'node:fs'

export default function (
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
  }
}
