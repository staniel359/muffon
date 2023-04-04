import getPath from './getPath.js'
import {
  writeFileSync
} from 'fs'

export default function (
  fileName,
  data
) {
  const filePath =
    getPath(
      fileName
    )

  writeFileSync(
    filePath,
    data
  )
}
