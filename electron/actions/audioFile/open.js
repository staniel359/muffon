import getAudioFilePath from './getPath'
import readFile from '#/actions/file/read'

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
