import {
  join as joinPath
} from 'node:path'
import {
  audioFolderPath
} from '../../helpers/paths.js'

export default function (
  fileName
) {
  return joinPath(
    audioFolderPath,
    fileName
  )
}
