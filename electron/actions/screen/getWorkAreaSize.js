import {
  screen
} from 'electron'

export default function () {
  return screen
    .getPrimaryDisplay()
    .workAreaSize
}
