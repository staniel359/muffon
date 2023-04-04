import {
  join as joinPath
} from 'path'
import {
  audioFolderPath
} from '../../paths.js'

export default function (
  fileName
) {
  return joinPath(
    audioFolderPath,
    fileName
  )
}
