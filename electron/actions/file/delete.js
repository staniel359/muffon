import {
  existsSync,
  unlinkSync
} from 'fs'

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
