import {
  app
} from 'electron'

export default function () {
  app
    .commandLine
    .appendSwitch(
      'disable-http-cache'
    )
}
