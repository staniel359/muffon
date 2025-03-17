import hotkeys from 'hotkeys-js'

const shortcuts = {
  quit: [
    'ctrl+q',
    'command+q'
  ],
  ignored: [
    'ctrl+r',
    'command+r',
    'f5'
  ]
}

function callQuit () {
  window
    .mainProcess
    .sendCommand(
      'call-quit'
    )
}

function handleQuitShortcut () {
  callQuit()
}

function handleIgnoredShortcut () {
  return false
}

function shortcutsString (
  action
) {
  return shortcuts[action].join(
    ', '
  )
}

export default function () {
  hotkeys(
    shortcutsString(
      'quit'
    ),
    handleQuitShortcut
  )

  hotkeys(
    shortcutsString(
      'ignored'
    ),
    handleIgnoredShortcut
  )
}
