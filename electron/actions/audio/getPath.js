import {
  join as joinPath
} from 'path'
import {
  audioFolderPath
} from '../../paths.js'

export default function getPath (
  fileName
) {
  return joinPath(
    audioFolderPath,
    fileName
  )
}
