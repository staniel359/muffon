import {
  join as joinPath
} from 'path'
import {
  backgroundImagesFolderPath
} from '../../helpers/paths.js'

export default function (
  fileName
) {
  return joinPath(
    backgroundImagesFolderPath,
    fileName
  )
}
