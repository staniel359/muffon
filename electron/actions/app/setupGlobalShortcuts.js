import {
  globalShortcut
} from 'electron'
import callExit from './callExit.js'
import {
  shortcuts
} from '../../helpers/utils.js'

function handleExitKeysPress () {
  callExit()
}

function addExitShortcut (
  shortcut
) {
  globalShortcut.register(
    shortcut,
    handleExitKeysPress
  )
}

function addExitShortcuts () {
  shortcuts
    .allowed
    .exit
    .forEach(
      addExitShortcut
    )
}

function removeReloadShortcut (
  shortcut
) {
  globalShortcut.unregister(
    shortcut
  )
}

function removeReloadShortcuts () {
  shortcuts
    .forbidden
    .reload
    .forEach(
      removeReloadShortcut
    )
}


function addAllowedShortcuts () {
  addExitShortcuts()
}

function removeForbiddenShortcuts () {
  removeReloadShortcuts()
}

export default function () {
  addAllowedShortcuts()

  removeForbiddenShortcuts()
}
