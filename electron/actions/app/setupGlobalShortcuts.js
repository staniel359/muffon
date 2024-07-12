import {
  globalShortcut
} from 'electron'
import callQuit from './callQuit.js'
import {
  shortcuts
} from '../../helpers/utils.js'

function handleQuitKeysPress () {
  callQuit()
}

function addQuitShortcut (
  shortcut
) {
  globalShortcut.register(
    shortcut,
    handleQuitKeysPress
  )
}

function addQuitShortcuts () {
  shortcuts
    .allowed
    .quit
    .forEach(
      addQuitShortcut
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
  addQuitShortcuts()
}

function removeForbiddenShortcuts () {
  removeReloadShortcuts()
}

export default function () {
  addAllowedShortcuts()

  removeForbiddenShortcuts()
}
