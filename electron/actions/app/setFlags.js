import {
  app
} from 'electron'

export default function () {
  app
    .commandLine
    .appendSwitch(
      'try-supported-channel-layouts'
    )
}
