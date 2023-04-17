import {
  join as joinPath
} from 'path'
import {
  audioFolderPath
} from '#/paths'

export default function (
  fileName
) {
  return joinPath(
    audioFolderPath,
    fileName
  )
}
