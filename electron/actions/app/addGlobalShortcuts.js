import {
  globalShortcut
} from 'electron'
import callExit from './callExit.js'
import {
  shortcuts
} from '../../helpers/utils.js'

function addExitShortcuts () {
  function handleKeysPress () {
    callExit()
  }

  globalShortcut.registerAll(
    shortcuts.exit,
    handleKeysPress
  )
}

export default function () {
  addExitShortcuts()
}
