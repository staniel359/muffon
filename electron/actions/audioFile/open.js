import getAudioFilePath from './getPath.js'
import readFile from '../file/read.js'

export default function (
  fileName
) {
  const filePath =
    getAudioFilePath(
      fileName
    )

  return readFile(
    filePath
  )
}
