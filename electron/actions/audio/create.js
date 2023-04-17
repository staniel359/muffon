import getPath from './getPath'
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
