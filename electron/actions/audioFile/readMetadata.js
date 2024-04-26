import {
  parseFile
} from 'music-metadata'

export default function (
  {
    filePath
  }
) {
  return parseFile(
    filePath
  )
}
