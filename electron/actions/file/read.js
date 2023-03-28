import {
  readFileSync
} from 'fs'

export default function read (
  filePath
) {
  return readFileSync(
    filePath
  )
}
