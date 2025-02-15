import {
  app
} from 'electron'
import dayjs from 'dayjs'
import {
  join as joinPath
} from 'node:path'

export function currentTime () {
  return dayjs.utc().format()
}

export function fileRootPath (
  filePath
) {
  return joinPath(
    app.getAppPath(),
    filePath
  )
}
