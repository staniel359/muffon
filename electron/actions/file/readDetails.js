import {
  statSync
} from 'fs'

export default function (
  filePath
) {
  return statSync(
    filePath
  )
}
