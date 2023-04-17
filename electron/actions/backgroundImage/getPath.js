import {
  join as joinPath
} from 'path'
import {
  backgroundImagesFolderPath
} from '#/paths'

export default function (
  fileName
) {
  return joinPath(
    backgroundImagesFolderPath,
    fileName
  )
}
