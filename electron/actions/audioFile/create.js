import {
  writeFileSync
} from 'node:fs'

import getAudioFilePath from './getPath.js'

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
