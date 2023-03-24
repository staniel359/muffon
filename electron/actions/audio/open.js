import getPath from './getPath.js'
import {
  readFileSync
} from 'fs'

export default function open (
  fileName
) {
  const filePath =
    getPath(
      fileName
    )

  return readFileSync(
    filePath
  )
}
