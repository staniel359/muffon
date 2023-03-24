import {
  app
} from 'electron'

export default function setFlags () {
  app
    .commandLine
    .appendSwitch(
      'try-supported-channel-layouts'
    )
}
