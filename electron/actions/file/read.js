import {
  existsSync,
  readFileSync
} from 'node:fs'

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
