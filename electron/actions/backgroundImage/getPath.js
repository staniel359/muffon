import {
  join as joinPath
} from 'path'
import {
  backgroundImagesFolderPath
} from '../../paths.js'

export default function getPath (
  fileName
) {
  return joinPath(
    backgroundImagesFolderPath,
    fileName
  )
}
