import {
  existsSync,
  readFileSync
} from 'fs'

export default function (
  filePath
) {
  const isFileExist =
    existsSync(
      filePath
    )

  if (isFileExist) {
    return readFileSync(
      filePath
    )
  }
}
