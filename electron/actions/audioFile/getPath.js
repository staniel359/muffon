import {
  join as joinPath
} from 'path'
import {
  audioFolderPath
} from '#/helpers/paths'

export default function (
  fileName
) {
  return joinPath(
    audioFolderPath,
    fileName
  )
}
