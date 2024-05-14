import getAudioFilePath from './getPath.js'
import {
  writeFileSync
} from 'fs'

export default function (
  fileName,
  data
) {
  const filePath =
    getAudioFilePath(
      fileName
    )

  writeFileSync(
    filePath,
    data
  )
}
