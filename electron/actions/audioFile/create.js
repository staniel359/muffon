import getAudioFilePath from './getPath'
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
