import dayjs from 'dayjs'
import {
  fileURLToPath
} from 'node:url'
import {
  dirname,
  join as joinPath
} from 'node:path'

export function currentTime () {
  return dayjs.utc().format()
}

function getDirectory () {
  const fileUrl = import.meta.url

  if (fileUrl) {
    const filePath =
      fileURLToPath(
        fileUrl
      )

    return dirname(
      filePath
    )
  } else {
    return __dirname
  }
}

export function fileRootPath (
  filePath
) {
  const directory = getDirectory()

  return joinPath(
    directory,
    '..',
    '..',
    filePath
  )
}
