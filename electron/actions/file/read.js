import {
  readFileSync
} from 'fs'

export default function (
  filePath
) {
  return readFileSync(
    filePath
  )
}
