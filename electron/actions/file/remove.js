import {
  unlinkSync
} from 'fs'

export default function remove (
  filePath
) {
  unlinkSync(
    filePath,
    () => true
  )
}
