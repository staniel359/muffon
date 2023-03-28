import {
  statSync
} from 'fs'

export default function readDetails (
  filePath
) {
  return statSync(
    filePath
  )
}
